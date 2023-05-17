import schedule
import time
import requests
import pandas as pd
def doCorona():
    address = 'https://ncov.kdca.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun='
    res = requests.get(address)
    res.encoding = None
    from bs4 import BeautifulSoup as bs
    soup = bs(res.text)
    sb = soup.select('.rpsa_map > .rpsam_graph button')
    newList=[]

    for s in sb:
        newDict={}
        newDict['지역'] = s.span.text
        newDict['총인원'] = s.find('span','num').text
        newDict['증가값'] = s.find('span','before').text
        newList.append(newDict)
    pd.DataFrame(newList).to_json('./main/static/main/json/newCorona.json', orient = 'index', indent = 4)
    # print('3초마다 실행되는지 확인')
# 매일 특정 HH:MM 및 다음 HH:MM:SS에 작업 실행
schedule.every(3).seconds.do(doCorona)
schedule.every().day.at("15:00").do(doCorona)
while True:
    schedule.run_pending()
    time.sleep(1)