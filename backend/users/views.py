from rest_framework.views import APIView  # type: ignore
from rest_framework import status # type: ignore
from .serializers import UserSerializer, VerifyOTPSerializer
# , FieldSerializer
from rest_framework.response import Response #type: ignore
from .models import User, Farm, Season, Field, CropRotation
# , Field
from rest_framework.exceptions import AuthenticationFailed, NotFound # type: ignore
import jwt, datetime # type: ignore
from .email import send_opt_via_email
import ee # type : ignore
from django.http import HttpResponse # type: ignore
from .serializers import FarmSerializer, SeasonSerializer, FieldSerializer, CropRotationSerializer
from django.shortcuts import get_object_or_404



# Register User 
class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        existing_user = User.objects.filter(email=email).first()

        # Check if the user with the provided email already exists and is not verified
        if existing_user and not existing_user.is_verified:
            existing_user.delete()  # Delete the existing user
        
        
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            serializer.save()
            
            # Send Email to use
            send_opt_via_email(serializer.data['email'])
            return Response({
                'status': 200,
                'message': 'User created successfully please check your email for otp',
                'data': serializer.data
            })
        
        return Response(serializer.data)
    
# Verify OTP
class VerifyOTPView(APIView):
   def post(self, request):
    try:
        data = request.data
        serializer = VerifyOTPSerializer(data=data)
        
        if serializer.is_valid():
            user_email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            
            user = User.objects.filter(email=user_email).first()  # Use .first() to get the first matching user
            
            if user.is_verified:
                return Response({
                    'status': 400,
                    'message': 'User is already verified',
                })
                
            if user.otp == otp:
                user.is_verified = True
                user.otp = ''
                user.save()
                return Response({
                    'status': 200,
                    'message': 'User verified successfully',
                    'data': serializer.data
                })
            else:
                return Response({
                    'status': 400,
                    'message': 'Incorrect OTP',
                    'data': serializer.data
                })
        else:
            return Response({
                'status': 400,
                'message': 'Incorrect email',
                'data': serializer.data
            })

    except Exception as e:
        return Response({
            'status': 400,
            'message': 'Incorrect OTP',
            'data': serializer.data
        })

        
    

# Login User
class loginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        if not user.is_verified:
            raise AuthenticationFailed('Account is not verified. Please check your email for verification instructions.')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=15),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response()
        
        # response.set_cookie(key='jwt', value=token, httponly=True, samesite='None', secure=True, path='/')
        response.set_cookie(key='jwt', value=token, httponly=True, samesite='None', secure=True, path='/', expires=datetime.datetime.utcnow() + datetime.timedelta(days=30))


        response.data = {
            'jwt': token
        }
        
        return response
    
    

# Verify the user with jwt
def get_user_with_jwt(request):
    token = request.COOKIES.get('jwt')
    print("use token is ", request.COOKIES.get('jwt'))
    
    if not token:
        raise AuthenticationFailed('Unauthenticated!')
    
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')
    
    user = User.objects.filter(id=payload['id']).first()
    return user
    
    
# View the user 
class UserView(APIView):
    def get(self, request):
        user = get_user_with_jwt(request)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    
#Logout 
class logoutView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        print("token is ", token)
        if not token:
            raise AuthenticationFailed('Please login first.')
        
        # response = HttpResponse()
        response = Response()
        response.set_cookie('jwt', '', max_age=0, path='/', samesite='None', secure=True)
        # response.delete_cookie('jwt')
        
        response.data = {
            'message': 'success'
        }
        return response
    

# Create the farm
class CreateFarmView(APIView):
    def post(self, request):
        user = get_user_with_jwt(request)
        
        if not user:
            raise AuthenticationFailed('User not found')
        

        try:
            # Extract data from the request
            data = request.data

            # Check if a farm with the same coordinates exists for the user
            existing_farm = Farm.objects.filter(user=user, latitude=data['latitude'], longitude=data['longitude']).first()
            

            if existing_farm:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'A farm with the same coordinates already exists for this user.'
                })

            # Assign the current user to the 'user' field
            data['user'] = user.id

            serializer = FarmSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    'status': status.HTTP_201_CREATED,
                    'message': 'Farm created successfully',
                    'data': serializer.data
                })
            else:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'Invalid data',
                    'errors': serializer.errors
                })
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while creating the farm',
                'error': str(e)
            })
            

# Delete the farm
class DeleteFarmView(APIView):
    # authentication_classes = [CustomTokenAuthentication]  # Use the appropriate authentication class

    def delete(self, request, farm_id):        
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        # Retrieve the farm associated with the user and the provided farm_id
        farm = get_object_or_404(Farm, user=user, id=farm_id)

        # Delete the farm
        farm.delete()

        return Response({
            'status': status.HTTP_204_NO_CONTENT,
            'message': 'Farm deleted successfully'
        })

# Get the farm
class FarmListView(APIView):
    def get(self, request, farm_id=None):
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')
        
        if farm_id is not None:
            # Get a specific farm by ID
            try:
                farm = Farm.objects.get(id=farm_id, user=user)
                serializer = FarmSerializer(farm)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Farm.DoesNotExist:
                return Response({'message': 'Farm not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Get all farms
            farms = Farm.objects.filter(user=user)
            serializer = FarmSerializer(farms, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
    

# Create the season
class CreateSeasonView(APIView):
    def post(self, request):
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            # Extract data from the request
            data = request.data


            

            # Assign the current user ID to the 'user' field
            data['user'] = user.id  # Check if user.id contains a valid integer

            # Pass the request object to the serializer context
            serializer = SeasonSerializer(data=data, context={'request': request})

            if serializer.is_valid():
                serializer.save()
                return Response({
                    'status': status.HTTP_201_CREATED,
                    'message': 'Season created successfully',
                    'data': serializer.data
                })
            else:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'Invalid data',
                    'errors': serializer.errors
                })
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while creating the season',
                'error': str(e)
            })


# Update the season
class UpdateSeasonView(APIView):
    def post(self, request, season_id):
        user = get_user_with_jwt(request)
        
        if not user:
            raise AuthenticationFailed('User not found')

        try:
            # Check if the season with the provided ID exists
            season = Season.objects.filter(id=season_id).first()
            
            if not season:
                raise NotFound(detail="Season not found")

            # Ensure that the season being updated belongs to the authenticated user
            if season.user != user:
                raise AuthenticationFailed('Unauthorized')

            # Extract data from the request for updating the season
            data = request.data

            serializer = SeasonSerializer(season, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    'status': status.HTTP_200_OK,
                    'message': 'Season updated successfully',
                    'data': serializer.data
                })
            else:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'Invalid data',
                    'errors': serializer.errors
                })
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while updating the season',
                'error': str(e)
            })
    

# Delete the season
class DeleteSeasonView(APIView):
    def delete(self, request, season_id):
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            # Check if the season with the provided ID exists
            season = Season.objects.filter(id=season_id).first()

            if not season:
                raise NotFound(detail="Season not found")

            # Ensure that the season being deleted belongs to the authenticated user
            if season.user != user:
                raise AuthenticationFailed('Unauthorized')

            # Delete the season
            season.delete()

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'message': 'Season deleted successfully'
            })

        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while deleting the season',
                'error': str(e)
            })

# Get the season
class SeasonListView(APIView):

    def get(self, request, season_id=None):
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            if season_id is not None:
                # Get a specific season by ID belonging to the current user
                season = Season.objects.filter(id=season_id, user=user).first()
                if not season:
                    return Response({'message': 'Season not found'}, status=status.HTTP_404_NOT_FOUND)

                serializer = SeasonSerializer(season)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Get all seasons belonging to the current user
                seasons = Season.objects.filter(user=user)
                serializer = SeasonSerializer(seasons, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while fetching seasons',
                'error': str(e)
            })
            
            

# Create a new field
class CreateFieldView(APIView):

    def post(self, request):
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            # Extract data from the request for creating a field
            data = request.data
            farm_id = data.get('farm')

            # Check if the farm ID belongs to the current user
            try:
                farm = Farm.objects.get(id=farm_id, user=user)
            except Farm.DoesNotExist:
                return Response({'message': 'You don\'t have such a farm.'}, status=status.HTTP_400_BAD_REQUEST)

            serializer = FieldSerializer(data=data)

            if serializer.is_valid():
                # Associate the farm with the field and remove the 'season' field from the data
                serializer.validated_data['farm'] = farm
                serializer.validated_data.pop('season', None)
                serializer.save()

                return Response({
                    'status': status.HTTP_201_CREATED,
                    'message': 'Field created successfully',
                    'data': serializer.data
                })
            else:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'Invalid data',
                    'errors': serializer.errors
                })
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while creating the field',
                'error': str(e)
            })

# Update a field
class UpdateFieldView(APIView):

    def post(self, request, field_id):
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            # Check if the field with the provided ID exists
            field = Field.objects.filter(id=field_id).first()

            if not field:
                raise NotFound(detail="Field not found")

            # Ensure that the field being updated belongs to the authenticated user
            if field.farm.user != user:
                raise AuthenticationFailed('Unauthorized')

            # Extract data from the request for updating the field
            data = request.data

            serializer = FieldSerializer(field, data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    'status': status.HTTP_200_OK,
                    'message': 'Field updated successfully',
                    'data': serializer.data
                })
            else:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'Invalid data',
                    'errors': serializer.errors
                })
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while updating the field',
                'error': str(e)
            })

# Delete a field
class DeleteFieldView(APIView):

    def delete(self, request, field_id):
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            # Check if the field with the provided ID exists
            field = Field.objects.filter(id=field_id).first()

            if not field:
                raise NotFound(detail="Field not found")

            # Ensure that the field being deleted belongs to the authenticated user
            if field.farm.user != user:
                raise AuthenticationFailed('Unauthorized')

            # Delete the field
            field.delete()

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'message': 'Field deleted successfully'
            })

        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while deleting the field',
                'error': str(e)
            })
            
# Get the field
class FieldListView(APIView):

    def get(self, request, farm_id=None):
        user = get_user_with_jwt(request);
        print("User is ");
        print("This is field farm")

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            print("Farm id is ", farm_id)
            if farm_id is not None:
                # Get all fields belonging to the farm with the specified ID and the current user
                fields = Field.objects.filter(farm__id=farm_id, farm__user=user)
                serializer = FieldSerializer(fields, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Get all fields belonging to the current user
                fields = Field.objects.filter(farm__user=user)
                
                serializer = FieldSerializer(fields, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while fetching fields',
                'error': str(e)
            })
            
            
# Create Crop Rotation view   
class CreateCropRotationView(APIView):

    def post(self, request):
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            data = request.data
            field_id = data.get('field')
            season_id = data.get('season')  # Note the change here

            # Check if the field ID belongs to the current user's farm
            try:
                field = Field.objects.get(id=field_id, farm__user=user)
            except Field.DoesNotExist:
                return Response({'message': 'You don\'t have such a field.'}, status=status.HTTP_400_BAD_REQUEST)

            # Ensure that the selected season belongs to the user
            try:
                season = Season.objects.get(id=season_id, user=user)
            except Season.DoesNotExist:
                return Response({'message': f'Season with ID {season_id} does not exist or does not belong to you.'}, status=status.HTTP_400_BAD_REQUEST)

            # Add the field ID and season ID to the data for creating the crop rotation
            data['field'] = field.id
            data['season'] = season.id  # Note the change here

            serializer = CropRotationSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    'status': status.HTTP_201_CREATED,
                    'message': 'Crop rotation created successfully',
                    'data': serializer.data
                })
            else:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'Invalid data',
                    'errors': serializer.errors
                })
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while creating the crop rotation',
                'error': str(e)
            })

            
            
            
# Update the Crop Rotation view
class UpdateCropRotationView(APIView):
    serializer_class = CropRotationSerializer

    def post(self, request, season_id, field_id):  # Note the additional arguments to get data from the URL
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            # Check if season and field belong to the user
            try:
                season = Season.objects.get(id=season_id, user=user)
                field = Field.objects.get(id=field_id, farm__user=user)
            except (Season.DoesNotExist, Field.DoesNotExist):
                return Response({'message': 'Season or Field does not exist or does not belong to you.'}, status=status.HTTP_400_BAD_REQUEST)

            # Check for an existing crop rotation for the provided season and field
            try:
                instance = CropRotation.objects.get(season=season, field=field)
            except CropRotation.DoesNotExist:
                return Response({'message': 'Crop rotation not found'}, status=status.HTTP_404_NOT_FOUND)

            # Extract and update data from the request
            data = {
                'crop_name': request.data.get('crop_name', instance.crop_name),
                'planting_date': request.data.get('planting_date', instance.planting_date),
                'harvesting_date': request.data.get('harvesting_date', instance.harvesting_date),
                'crop_variety': request.data.get('crop_variety', instance.crop_variety),
            }

            serializer = self.serializer_class(instance, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()

                return Response({
                    'status': status.HTTP_200_OK,
                    'message': 'Crop rotation updated successfully',
                    'data': serializer.data
                })
            else:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'Invalid data',
                    'errors': serializer.errors
                })
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while updating the crop rotation',
                'error': str(e)
            })

            
# Get the Crop Rotation view with id and all 
class CropRotationListView(APIView):

    def get(self, request, season_id=None, field_id=None):  # Make arguments optional with default value as None
        user = get_user_with_jwt(request)

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            # If both season_id and field_id are provided, get the specific crop rotation
            if season_id and field_id:
                crop_rotation = CropRotation.objects.filter(season__id=season_id, field__id=field_id, field__farm__user=user).first()
                
                if not crop_rotation:
                    raise NotFound(detail="Crop rotation not found")

                serializer = CropRotationSerializer(crop_rotation)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # If no specific season_id and field_id are provided, get all crop rotations for the user
                crop_rotations = CropRotation.objects.filter(field__farm__user=user)
                serializer = CropRotationSerializer(crop_rotations, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while fetching crop rotations',
                'error': str(e)
            })

            
#Delete the crop rotation    
    
class DeleteCropRotationView(APIView):

    def get(self, request, crop_rotation_id):
        user = get_user_with_jwt(request)
        print("You are at the deletion of the crop rotation")

        if not user:
            raise AuthenticationFailed('User not found')

        try:
            crop_rotation = CropRotation.objects.get(id=crop_rotation_id)
            
            # Check if the user has permissions to delete this crop rotation
            if crop_rotation.field.farm.user != user:
                return Response({'message': 'You do not have permission to delete this crop rotation.'}, status=status.HTTP_403_FORBIDDEN)

            # Delete the crop rotation
            crop_rotation.delete()

            return Response({
                'status': status.HTTP_200_OK,
                'message': 'Crop rotation deleted successfully',
            })

        except CropRotation.DoesNotExist:
            return Response({'message': 'Crop rotation not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while deleting the crop rotation',
                'error': str(e)
            })