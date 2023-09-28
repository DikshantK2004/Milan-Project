from firebase_admin import auth
import nltk
from datetime import datetime
import pytz

# Create a timezone object for IST (Indian Standard Time)
ist = pytz.timezone('Asia/Kolkata')

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



# Get current time in IST
def current_time():
  now = datetime.now(ist)
  return now.strftime("%d/%m/%Y")


def new_average(initial_average, new_value, count):
    return (initial_average*count + new_value)/(count+1)

def handle_negation(tagged_list):
    negation = False
    result = []
    for word, tag in tagged_list:
        if word.lower() == "not" or word.lower() == "neither":
            negation = not negation
        elif negation and tag in ('JJ', 'JJR', 'JJS'):
            result.append(('not ' + word, tag))  # Prefix adjective with "not_"
            negation = False
        else:
            result.append((word, tag))
    return result

def aspect_sentiment_analysis(txt, stop_words, nlp):
    txt = txt.lower()  # Lowercasing the given Text
    sentList = nltk.sent_tokenize(txt)  # Splitting the text into sentences

    fcluster = []
    totalfeatureList = []
    finalcluster = []
    dic = {}

    for line in sentList:
        newtaggedList = []
        txt_list = nltk.word_tokenize(line)  # Splitting up into words
        taggedList = nltk.pos_tag(txt_list)  # Doing Part-of-Speech Tagging to each word

        # Handle negation
        taggedList = handle_negation(taggedList)

        newwordList = []
        flag = 0
        for i in range(0, len(taggedList) - 1):
            if taggedList[i][1] == "NN" and taggedList[i + 1][1] == "NN":
                newwordList.append(taggedList[i][0] + taggedList[i + 1][0])
                flag = 1
            else:
                if flag == 1:
                    flag = 0
                    continue
                newwordList.append(taggedList[i][0])
                if i == len(taggedList) - 2:
                    newwordList.append(taggedList[i + 1][0])

        finaltxt = ' '.join(word for word in newwordList)
        new_txt_list = nltk.word_tokenize(finaltxt)
        wordsList = [w for w in new_txt_list if w not in stop_words]
        taggedList = nltk.pos_tag(wordsList)

        doc = nlp(finaltxt)  # Object of Stanford NLP Pipeline
        dep_tree = doc.sentences[0].dependencies
        # Getting the dependency relations betwwen the words
        dep_node = []
        for edge in dep_tree:

          dep_word = int(edge[0].id)
          head_word = edge[2].text
          dep_relation = edge[1]
          dep_node.append([ dep_word,head_word, dep_relation])
        # Converting it into appropriate format
        for i in range(0, len(dep_node)):
            if (len(dep_node[i]) == 0):
              continue;
            if (dep_node[i][0] != 0):
              
                if (len(newwordList) > int(dep_node[i][0]) - 1):
                  dep_node[i][0] = newwordList[int(dep_node[i][0]) - 1]

        featureList = []
        categories = []
        for i in taggedList:
            if i[1] in ('JJ', 'JJR', 'JJS', 'NN', 'NNS', 'RB'):
                featureList.append(list(i))  
                totalfeatureList.append(list(i))  
                categories.append(i[0])

        for i in featureList:
            filist = []
            for j in dep_node:
                if (j[0] == i[0] or j[1] == i[0]) and j[2] in [
                    "nsubj", "acl:relcl", "obj", "dobj", "agent", "advmod", "amod", "neg", "prep_of", "acomp", "xcomp",
                    "compound"]:
                    if j[0] == i[0]:
                        filist.append(j[1])
                    else:
                        filist.append(j[0])
            fcluster.append([i[0], filist])

    for i in totalfeatureList:
        dic[i[0]] = i[1]

    for i in fcluster:
        if dic[i[0]] == "NN":
            finalcluster.append(i)

    return finalcluster



fields={
      'battery': -1,
    'process': -1,
    'display': -1,
    'gaming': -1,
    'sound': -1

  }


def get_aspect_scores(review, stop_words, nlp, predictor):
  
  aspect_sentiments = aspect_sentiment_analysis(review, stop_words, nlp)

  i = 0
  sentence=[]
  a=''
  for sublist in aspect_sentiments:
    a+=sublist[0]+' '
    for k in sublist[1]:
      a+=k+' '
    sentence.append(a)

    a=''
  for segment in sentence:
    predicted_sentiments = predictor.predict(segment, return_proba=True)
    for stuff in segment.split():
        for key in fields.keys():
            if key in stuff.lower():  
               fields[key]=predicted_sentiments[1]
  return fields         