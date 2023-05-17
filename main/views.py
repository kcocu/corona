from django.http import HttpResponse
from django.shortcuts import render

# from django.core import serializers

# Create your views here.

# 캔버스 연습
def index(request):
  return render(request, 'main/index.html')

def main(request):
  return render(request, 'main/home.html')

def now(request):
  return render(request, 'main/now.html')

def doctor(request):
  # new_contry_form = request.GET.get('new_contry_form')
  # post_list = serializers.serialize('json', posts)
  return render(request, 'main/doctor.html')

import pandas as pd
from scipy import stats
import seaborn as sns
import matplotlib.pyplot as plt

def hypothesis(request):
  if request.GET.get('x_axis_hypothesis'):
    try:
      Y1=pd.read_csv('main/static/main/cov/Y1.csv')
      x_axis_hypothesis=request.GET.get('x_axis_hypothesis')
      y_axis_hypothesis=request.GET.get('y_axis_hypothesis')
      pear = stats.pearsonr(Y1[x_axis_hypothesis], Y1[y_axis_hypothesis])
      # (1,1)로 새 도화지를 그려줌 (초기화 시킴)
      _, fig =plt.subplots()
      sns.regplot(Y1[x_axis_hypothesis], Y1[y_axis_hypothesis], data=Y1, ax=fig)
      plt.savefig('media/main/test.png')
      
      context = {
        'stat':pear[0],
        'pvalue':pear[1],
                }
      return render(request, 'main/hypothesis.html',context)
    except :
      return HttpResponse("<script>alert('죄송합니다! 아직 그래프가 들어가지 않았습니다. 이전 페이지로 다시 돌아갑니다.');location.href='/hypothesis/';</script>")
  return render(request, 'main/hypothesis.html')

# import pandas as pd

# AllContry = pd.read_csv('main/static/main/cov/doc60-21.csv')
# for i in AllContry['LOCATION'].value_counts().index:
#   NewContry=AllContry[AllContry['LOCATION'] == i]
#   print(NewContry)
#   NewContry.to_json(f'main/static/main/json/NEW_{i}.json', orient = 'index', indent = 4)
# AllContry['LOCATION'] == 'AUS'

cov_group=pd.read_csv('main/static/main/cov/xx.csv')
covid_long = pd.melt(cov_group, id_vars=['group','subgroup'])
covid_long['지역'] = covid_long['variable'].apply(lambda x : x[:3])
covid_long['종류'] = covid_long['variable'].apply(lambda x : x[3:])

def xCal(rsa_value,state_value):
  return covid_long[covid_long['종류']==state_value].groupby('group').get_group(rsa_value)

def subGroup(rsa_value,state_value):
  yyy = xCal(rsa_value,state_value)['subgroup'].value_counts().index
  new_list = []
  for i in yyy:
    new_list.append(i)
  return new_list

def ageMean(rsa_value,state_value):
  x = xCal(rsa_value,state_value)
  x0 = x[x['subgroup'] == '0-17']['value']
  x1 = x[x['subgroup'] == '18-24']['value']
  x2 = x[x['subgroup'] == '25-34']['value']
  x3 = x[x['subgroup'] == '35-44']['value']
  x4 = x[x['subgroup'] == '45-54']['value']
  x5 = x[x['subgroup'] == '55-64']['value']
  x6 = x[x['subgroup'] == '65-74']['value']
  x7 = x[x['subgroup'] == '75+']['value']
  return [x0,x1,x2,x3,x4,x5,x6,x7]

def ageRealMean(rsa_value,state_value):
  x = xCal(rsa_value,state_value)
  x0 = x[x['subgroup'] == '0-17']['value'].mean()
  x1 = x[x['subgroup'] == '18-24']['value'].mean()
  x2 = x[x['subgroup'] == '25-34']['value'].mean()
  x4 = x[x['subgroup'] == '45-54']['value'].mean()
  x5 = x[x['subgroup'] == '55-64']['value'].mean()
  x6 = x[x['subgroup'] == '65-74']['value'].mean()
  x3 = x[x['subgroup'] == '35-44']['value'].mean()
  x7 = x[x['subgroup'] == '75+']['value'].mean()
  return [x0,x1,x2,x3,x4,x5,x6,x7]

def ageCal(rsa_value,state_value):
  x=ageMean(rsa_value,state_value)
  return stats.f_oneway(x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7])

def sexMean(rsa_value,state_value):
  x = xCal(rsa_value,state_value)
  xm = x[x['subgroup'] == 'Male']['value']
  xf = x[x['subgroup'] == 'Female']['value']
  return [xm,xf]

def sexRealMean(rsa_value,state_value):
  x = xCal(rsa_value,state_value)
  xm = x[x['subgroup'] == 'Male']['value'].mean()
  xf = x[x['subgroup'] == 'Female']['value'].mean()
  return [xm,xf]

def sexCal(rsa_value,state_value):
  x = sexMean(rsa_value,state_value)
  return stats.ttest_ind(x[0],x[1],equal_var=False)

def raceMean(rsa_value,state_value):
  x = xCal(rsa_value,state_value)
  x0 = x[x['subgroup'] == 'Asian/Pacific-Islander']['value']
  x1 = x[x['subgroup'] == 'Black/African-American']['value']
  x2 = x[x['subgroup'] == 'Hispanic/Latino']['value']
  x3= x[x['subgroup'] == 'White']['value']
  return [x0, x1, x2, x3]

def raceRealMean(rsa_value,state_value):
  x = xCal(rsa_value,state_value)
  x0 = x[x['subgroup'] == 'Asian/Pacific-Islander']['value'].mean()
  x1 = x[x['subgroup'] == 'Black/African-American']['value'].mean()
  x2 = x[x['subgroup'] == 'Hispanic/Latino']['value'].mean()
  x3= x[x['subgroup'] == 'White']['value'].mean()
  return [x0, x1, x2, x3]
    
def raceCal(rsa_value,state_value):
  x = raceMean(rsa_value,state_value)
  return stats.f_oneway(x[0], x[1], x[2], x[3])
  
def people(request):
  if request.GET.get('rsa'):
    rsa_value = request.GET.get('rsa')
    try :
      if rsa_value == 'Race/ethnicity':
        title = '인종'
        test_name='F검정'
        if request.GET.get('state'):
          state_value = request.GET.get('state')
          if state_value == 'CONFIRMED_CASE_RATE':
            stat = raceCal(rsa_value,state_value)
            context = {
              'stat':stat[0],'pvalue':stat[1], 
              'title':title, 'title2':'확진자', 
              'test_name':test_name, 'x':xCal(rsa_value,state_value), 
              'x_html':xCal(rsa_value,state_value).to_html(header="true", index = False),
              'x_index':subGroup(rsa_value,state_value),
              'y_mean':raceRealMean(rsa_value,state_value)
            }
          elif state_value == 'HOSPITALIZED_RATE':
            stat = raceCal(rsa_value,state_value)
            context = {
              'stat':stat[0],'pvalue':stat[1], 
              'title':title, 'title2':'입원자', 
              'test_name':test_name, 'x':xCal(rsa_value,state_value), 
              'x_html':xCal(rsa_value,state_value).to_html(header="true", index = False),
              'x_index':subGroup(rsa_value,state_value),
              'y_mean':raceRealMean(rsa_value,state_value)
              }
          else :
            stat = raceCal(rsa_value,state_value)
            context = {
              'stat':stat[0],'pvalue':stat[1], 
              'title':title, 'title2':'사망자', 
              'test_name':test_name, 'x':xCal(rsa_value,state_value), 
              'x_html':xCal(rsa_value,state_value).to_html(header="true", index = False),
              'x_index':subGroup(rsa_value,state_value),
              'y_mean':raceRealMean(rsa_value,state_value)
              } 
      elif rsa_value == 'Sex':
        if request.GET.get('state'):
          state_value = request.GET.get('state')
          title = '성별'
          test_name='T검정'
          if state_value == 'CONFIRMED_CASE_RATE':
            stat = sexCal(rsa_value,state_value)
            context = {
              'stat':stat[0],'pvalue':stat[1], 
              'title':title, 'title2':'확진자', 
              'test_name':test_name,  'x':xCal(rsa_value,state_value), 
              'x_html':xCal(rsa_value,state_value).to_html(header="true", index = False),
              'x_index':subGroup(rsa_value,state_value),
              'y_mean':sexRealMean(rsa_value,state_value)
              }
          elif state_value == 'HOSPITALIZED_RATE':
            stat = sexCal(rsa_value,state_value)
            context = {
              'stat':stat[0],'pvalue':stat[1], 
              'title':title, 'title2':'입원자', 
              'test_name':test_name, 'x':xCal(rsa_value,state_value), 
              'x_html':xCal(rsa_value,state_value).to_html(header="true", index = False),
              'x_index':subGroup(rsa_value,state_value),
              'y_mean':sexRealMean(rsa_value,state_value)
              }
          else :
            stat = sexCal(rsa_value,state_value)
            context = {
              'stat':stat[0],'pvalue':stat[1], 
              'title':title, 'title2':'사망자', 
              'test_name':test_name, 'x':xCal(rsa_value,state_value), 
              'x_html':xCal(rsa_value,state_value).to_html(header="true", index = False),
              'x_index':subGroup(rsa_value,state_value),
              'y_mean':sexRealMean(rsa_value,state_value)
              }
      else :
        if request.GET.get('state'):
          state_value = request.GET.get('state')
          title = '나이'
          test_name='F검정'
          if state_value == 'CONFIRMED_CASE_RATE':
            stat = ageCal(rsa_value,state_value)
            context = {
              'stat':stat[0],'pvalue':stat[1], 
              'title':title, 'title2':'확진자', 
              'test_name':test_name,  'x':xCal(rsa_value,state_value), 
              'x_html':xCal(rsa_value,state_value).to_html(header="true", index = False),
              'x_index':subGroup(rsa_value,state_value),
              'y_mean':ageRealMean(rsa_value,state_value)
              }
          elif state_value == 'HOSPITALIZED_RATE':
            stat = ageCal(rsa_value,state_value)
            context = {
              'stat':stat[0],'pvalue':stat[1], 
              'title':title, 'title2':'입원자', 
              'test_name':test_name, 'x':xCal(rsa_value,state_value), 
              'x_html':xCal(rsa_value,state_value).to_html(header="true", index = False),
              'x_index':subGroup(rsa_value,state_value),
              'y_mean':ageRealMean(rsa_value,state_value)
              }
          else :
            stat = ageCal(rsa_value,state_value)
            context = {
              'stat':stat[0],'pvalue':stat[1], 
              'title':title, 'title2':'사망자',
              'test_name':test_name, 'x':xCal(rsa_value,state_value), 
              'x_html':xCal(rsa_value,state_value).to_html(header="true", index = False),
              'x_index':subGroup(rsa_value,state_value),
              'y_mean':ageRealMean(rsa_value,state_value)
              }
      return render(request,'main/people.html', context)
    except :
      return HttpResponse(
        "<script>alert('CONFIRMED,HOSPITALIZED,DEATH 중 하나를 체크해주세요!!\\n\\n 분석 페이지로 다시 돌아갑니다.');location.href='/people/';</script>"
        )
  
  return render(request,'main/people.html')
