import json
import boto3
import re

s3=boto3.resource('s3')
client = boto3.client('s3')

#get all of the tracks in the bucket
def lambda_handler(event, context):
    s3Bucket = s3.Bucket('musictracksbucket')
    artists=[]
    songs=[]
    tracks=[]
    
    #many tests to see how to parse "artists" & "trackname", 
    #done later in a Javascript function
    for bucket_object in s3Bucket.objects.all():
        x=bucket_object.key.split(" - ")[0]
        artists.append(x)
        y=bucket_object.key.split(" - ")[1]
        songs.append(y)
        z=bucket_object.key
        tracks.append(z)
        
    print(artists)
    print(songs)
    
    #return each track in an array
    
    return tracks
    