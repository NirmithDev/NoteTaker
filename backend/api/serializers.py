from django.contrib.auth.models import User
from rest_framework import serializers

#django uses ORM (Object relational mapping) -> handles all database operations
# we will handle json in here
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        # only write when password is created we do not want to return it
        extra_kwargs = {"password":{"write_only":True}}
    #method to create a new version of our user
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        return user
    