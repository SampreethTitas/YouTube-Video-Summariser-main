from flask import Flask, request
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline

app = Flask(__name__)

@app.get('/summary')
def summary_api():
    url = request.args.get('url', '')
    video_id = url.split('=')[1]



    summary = get_summary(get_transcript(video_id))
    return summary, 'Summary Generated..!'


@app.get('/transcript')
def transcript_api():
    url = request.args.get('url', '')
    video_id = url.split('=')[1]



    subtitle = get_transcript(video_id)
    return subtitle, 'Summary Generated..!'

def get_transcript(video_id):
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = ' '.join([d['text'] for d in transcript_list])
        return transcript
    except:
        return "No transcript found"

    

def get_summary(transcript):


    summariser = pipeline('summarization')
    summary = ''

    if(transcript == "No transcript found"):
        summary = "Sorry,   No Transcript available for the video Requested"
    else:
        for i in range(0, (len(transcript)//1000)+1):
            summary_text = summariser(transcript[i*1000:(i+1)*1000])[0]['summary_text']
            summary = summary + summary_text + ' '

    
    return summary
    

if __name__ == '__main__':
    app.run()
