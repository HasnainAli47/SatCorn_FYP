from rest_framework.views import APIView  # type: ignore
from rest_framework import status
from .serializers import UserSerializer, VerifyOTPSerializer, FieldSerializer
from rest_framework.response import Response #type: ignore
from .models import User, Field
from rest_framework.exceptions import AuthenticationFailed # type: ignore
import jwt, datetime # type: ignore
from .email import send_opt_via_email
# Create your views here.


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
        print("Data is ",request.data)
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
        
        response.set_cookie(key='jwt', value=token, httponly=True, samesite='None', secure=True, path='/')

        response.data = {
            'jwt': token
        }
        
        return response
    
    
# View the user 
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        print(token)
        
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        # return user
        return Response(serializer.data)
    
    
#Logout 
class logoutView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Please login first.')
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
    

class CreateFieldView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        # Check if the user is authenticated
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        # user = UserView.get(self, request)
        

        # Accept polygon coordinates from the request data
        coordinates = request.data.get('coordinates', None)
        
        if not coordinates:
            return Response({'message': 'Polygon coordinates are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new Field instance associated with the logged-in user
        field = Field(user=user, coordinates=coordinates, name=request.data.get('name', ''))
        field.save()

        # Serialize the newly created field
        serializer = FieldSerializer(field)
        
        return Response({'message': 'Field created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
    

class RetrieveFieldsView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        # Check if the user is authenticated
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        
        # user = UserView.get(self, request)
        
        fields = Field.objects.filter(user=user)
        serializer = FieldSerializer(fields, many=True)
        return Response(serializer.data)
    

class DeleteFieldView(APIView):
    def delete(self, request, field_id):
        user = UserView.get(self, request)
        try:
            field = Field.objects.get(id=field_id, user=user)
            field.delete()
            return Response({'message': 'Field deleted successfully'})
        except Field.DoesNotExist:
            return Response({'message': 'Field not found'}, status=404)