from rest_framework import serializers
from .models import User, Farm, Season, Field, CropRotation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'is_verified']  # Use 'email' instead of 'username'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.CharField()
    otp = serializers.CharField()

class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = ['id', 'farm_name', 'latitude', 'longitude', 'user']
    
    
class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = ['user', 'season_name', 'start_date', 'end_date', 'fields']
    
    def validate(self, data):
        user = data.get('user')  # Access the 'user' field from the data dictionary
        season_name = data.get('season_name')
        
        # Check if a season with the same name exists for the same user
        existing_seasons = Season.objects.filter(user=user, season_name=season_name)
        
        # If updating an existing season, exclude it from the check
        if self.instance:
            existing_seasons = existing_seasons.exclude(pk=self.instance.pk)
        
        if existing_seasons.exists():
            raise serializers.ValidationError("A season with this name already exists for the user.")
        
        return data

    

class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = ['id', 'field_name', 'coordinates', 'farm']

    def validate(self, data):
        farm = data.get('farm')
        coordinates = data.get('coordinates')

        # Check if a field with the same coordinates already exists for the farm
        existing_fields = Field.objects.filter(farm=farm, coordinates=coordinates)

        if self.instance:
            existing_fields = existing_fields.exclude(pk=self.instance.pk)

        if existing_fields.exists():
            raise serializers.ValidationError("A field with these coordinates already exists for the farm.")

        return data
    
    
class CropRotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropRotation
        fields = ['seasons', 'field', 'crop_name', 'planting_date', 'harvesting_date', 'crop_variety']

    def validate(self, data):
        seasons = data.get('seasons')
        field = data.get('field')
        crop_name = data.get('crop_name')
        planting_date = data.get('planting_date')
        harvesting_date = data.get('harvesting_date')
        
        # Check if a crop rotation with the same name, field, and planting date exists in any of the specified seasons
        existing_rotations = CropRotation.objects.filter(seasons__in=seasons, field=field, crop_name=crop_name, planting_date=planting_date)
        
        # If updating an existing rotation, exclude it from the check
        if self.instance:
            existing_rotations = existing_rotations.exclude(pk=self.instance.pk)
        
        if existing_rotations.exists():
            raise serializers.ValidationError("A crop rotation with this name, field, and planting date already exists in the specified season(s).")
        
        return data