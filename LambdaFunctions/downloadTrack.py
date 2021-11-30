import json
import boto3
import uuid
import os
import requests


s3=boto3.resource('s3')

s3_client = boto3.client('s3')
BUCKET_NAME = 'musictracksbucket'

#get the filename of the track to be downloaded

def lambda_handler(event, context):
    mybucket=s3.Bucket(BUCKET_NAME)
    
    
    #for bucket_object in mybucket.objects.all():
    #  print(bucket_object.key)
    
    BUCKET_FILE_NAME=event['key']
    
    #generate presigned url and made it instantly downloadable
    url = boto3.client('s3').generate_presigned_url(
    ClientMethod='get_object', 
    Params={'Bucket': BUCKET_NAME, 'Key': BUCKET_FILE_NAME, 'ResponseContentDisposition': 'attachment'},
    ExpiresIn=3600)
    
    print("Url generated succesfully")
    
    return url
    