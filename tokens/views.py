from rest_framework.views import APIView
from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework.response import Response
from rest_framework.authentication import get_authorization_header
from tokens.authentication import create_refresh_access, create_token_access, decode_tore_access
from .serializers import UserSerializer
from .models import User 
# Create your views here.
class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True) 
        serializer.save()
        return Response(serializer.data)
class LoginAPIView(APIView):
    def post(self, request):
        user = User.objects.filter(username=request.data['username']).first()
        if not user: 
            raise APIException("The Account Not Exist")
        if not user.check_password(request.data['password']): 
            raise APIException("Your Password Is Wrong")
        access_token = create_token_access(user.id)
        access_refresh = create_refresh_access(user.id)
        
        response = Response()
        response.set_cookie("refreshToken", access_refresh, httponly=True)
        response.data = {
            "token": access_token
        }
        return response
class UserAPIView(APIView):
    def get(self, request): 
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:
            token = auth[1].decode("utf-8")
            id = decode_tore_access(token)
            user = User.objects.filter(pk=id).first()
            return Response(UserSerializer(user).data)
        raise AuthenticationFailed("Invalid Authenticated")
class RefreshAPIView(APIView):
    def post(self, request):
        response = request.COOKIES.get("refreshToken")
        token = decode_tore_access(response)
        access_token = create_token_access(token)
        response = Response()
        response.data = {
            "token": access_token
        } 
        return response
class LogoutAPIView(APIView):
    def post(self, _):
        response = Response()
        response.delete_cookie("refreshToken")
        response.data = {
            "message": "success"
        }
        return response
    