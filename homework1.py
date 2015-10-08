import feedparser		# imports feedparser to parse XML feed
import time		# imports time

user='xdtsxt@gmail.com'		# replace *** with your personal gmail user, or youruser@newschool.edu for your school account
<<<<<<< HEAD
passwd='xxxxxxxx'		# replace *** with your password for the above account
=======
passwd='xxxxxxx'		# replace *** with your password for the above account
>>>>>>> 97104a2c331ed5e959cec827510d048cf375e2de

while True: 	#loop forever ---- to exit use keys "ctr+c"
    root = feedparser.parse("https://" + user + ":" + passwd + "@mail.google.com/gmail/feed/atom")
    newmails = int(root["feed"]["fullcount"])
    
    def emailcount(n): #define function emailcount
        if n > 0: # if you have over 0 emails. You can change this based on how many emails you currently have unread in your inbox
            print "you have "+str(n)+" new email(s)"
        else: 
            print "you have no new email"

<<<<<<< Updated upstream
=======
    my001 = root["feed"]["title"]
    my002 = root["entries"][0]["title"]
    my003 = root["feed"]["published"]
    print my001
    print my002
    print "published time:"
    print my003
>>>>>>> Stashed changes

    # attemts

    my001 = feedparser.parse("https://" + user + ":" + passwd + "@mail.google.com/gmail/feed/atom")["feed"]["title"]
    print "---"+my001+"---"

    emailcount(newmails) #call emailcount function and pass value newmails as agrument
    time.sleep(60)		#wait for a minute


