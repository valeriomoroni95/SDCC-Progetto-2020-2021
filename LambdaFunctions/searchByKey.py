import json
import boto3
import re

s3=boto3.resource('s3')
client = boto3.client('s3')

#search "stringToSearch" in each object of the file
def lambda_handler(event, context):
    s3Bucket = s3.Bucket('musictracksbucket')
    input = event['stringToSearch']
    
    #title the input to match it with bucketFileName key format
    toSearch = input.title()
    print(toSearch)
    tracksFound=[]
    
    for bucket_object in s3Bucket.objects.all():
        
        if toSearch in bucket_object.key:
            tracksFound.append(bucket_object.key)
            print (bucket_object.key)  
    
    return tracksFound
   