import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb', region_name = 'us-east-1')


def lambda_handler(event, context):
    
    #Scan the Dynamo DB table to see if a user is present
    table = dynamodb.Table("UserTable")
    
    email = event['emailID']
    pwd = event['password']
    
    items = table.scan()['Items']
    
    #get the user who matches with emailID && password
    for item in items:
        response = table.query(
            KeyConditionExpression=Key('emailID').eq(email) & Key('password').eq(pwd)
        )
     
    return response
    