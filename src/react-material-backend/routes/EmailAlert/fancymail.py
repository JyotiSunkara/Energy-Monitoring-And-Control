from smtplib import SMTP 
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, FileSystemLoader
import os,sys

from_email = 'krbdashboard@outlook.com'
password = 'ArushiSinghal'
env = Environment(
    loader=FileSystemLoader('./templates/'))


def get_contacts(filename):
    """
    Return two lists names, emails containing names and email addresses
    read from a file specified by filename.
    """
    print("1")
    names = []
    emails = []
    with open(filename, mode='r', encoding='utf-8') as contacts_file:
        for a_contact in contacts_file:
            names.append(a_contact.split()[0])
            emails.append(a_contact.split()[1])
    return names, emails



def get_data():
    data = []
    print("2")
    data.append(
        {
         "movies": [
             {         
                 "title": 'Gone Girl',
                 "description": 'This is a fancy email'
             },
             {                 
                 "title": 'Delhi 6',
                 "description": 'Good movie'
             },
             {               
                 "title": 'The Lion King',
                 "description": 'Roar'
             },
             {               
                 "title": 'The Great Gatsby',
                 "description": ':o'
             }
         ]
         })
    print(data)
    return data

def send_mail(bodyContent):
    print("3")
    names, emails = get_contacts('mycontacts.txt') # Read contacts
    subject = 'Testing CSS/HTML again!'
    

    server = SMTP('smtp-mail.outlook.com', 587)
    server.starttls()
    server.login(from_email, password)

    for name, email in zip(names, emails):
        message = MIMEMultipart()
        message['Subject'] = subject
        message['From'] = from_email
        message['To'] = email

        message.attach(MIMEText(bodyContent, "html"))
        msgBody = message.as_string()

    
        server.sendmail(from_email, email, msgBody)
        del message

    server.quit()

def send_movie_list():
    print("4")
    json_data = get_data()
    print("ALMOST")
    template = env.get_template('child.html')
    print("DONE")
    output = template.render(data=json_data[0])
    send_mail(output)    
    # return "Mail sent successfully."

# if __name__ == '__main__':
print("1")
send_movie_list()
sys.stdout.flush()
