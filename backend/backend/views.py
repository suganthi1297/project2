from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserForm

@api_view(['POST'])
def submit_form(request):
    name= request.data.get('name')
    email= request.data.get('email')
    password=request.data.get('password')

    #duplicate check
    if UserForm.objects.filter(email=email).exists():
        return Response ({"error":"Email Already exists"})
    UserForm.objects.create(name=name,email=email,password=password)

    return Response({"message":"Success"})
