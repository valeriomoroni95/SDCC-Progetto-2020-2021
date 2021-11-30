import boto3

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
  
  #get event data and put it into DynamoDB table
  
  emailID = event['emailID']
  username = event['username']
  password = event['password']

  dynamodb.put_item(TableName='UserTable', Item={'emailID':{'S':emailID},'username':{'S':username},'password':{'S':password}})
  print(emailID)