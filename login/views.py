from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pam


# Create your views here.
def main(request):
    return render(request, 'login.html')


class loginUser(APIView):
    def post(self, request):
        print("POST REQ")
        username = request.data.get('username')
        password = request.data.get('password')
        print("post request: "+username + "\npassword: "+password)

        # function to check user credentials using PAM

        pa = pam.authenticate(username, password)
        print("PAM:  "+str(pa))
        if pa:
            print("User "+username+" authenticated succesfully.")
            return Response(status=status.HTTP_200_OK)
        else:
            print("User "+username+" authentication failed")
            return Response(status=status.HTTP_403_FORBIDDEN)
