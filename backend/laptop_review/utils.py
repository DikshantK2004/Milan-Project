from firebase_admin import auth


# Verify the user's token
def verify_id_token(token:str):
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        return uid
    except Exception as e:
        print(f"Token verification failed: {str(e)}")
        return None
    

# Get rating
def convert_to_rating(x):
    x = round(((x*5)/0.5) * 0.5)
    return x