# corona
이 프로젝트는 한가람 아카데미 2기의 2차 프로젝트 입니다. 분석 프로젝트지만, 그 결과를 웹으로 표현했습니다. 데이터 분석을 배우고 진행했습니다.

2023.02.10. ~ 2023.02.20. 약 일주일간 작업했습니다.

코로나의 기록을 분석해봤습니다.

장고=4.1, python=3.9.13, javascript es6, chart.js, d3.js, visual studio code로 만들었습니다.

이 프로젝트는 '코로나 사망률이 어떤 요인과 연관이 있었는가?'에 대한 답을 찾기 위해 진행했습니다.
최초에는 '코로나 사망률은 인구수 당 의사 수에 반비례 할 것이다.'라는 대립가설 하에 진행했습니다.

프로젝트의 결과가 너무 빠르고 허무하게 끝나서 추가로 다른 가설들을 진행했습니다.

먼저 인구 수 당 의사 수의 최신 데이터(2023)가 없기에 2021년 데이터를 가져왔습니다. 그리고 '인구 수 당 의사 수는 비례적으로 증가 할 것이다.' 라는 대립가설을 세우고 먼저 증명했습니다.
![image](https://github.com/kcocu/corona/assets/40687753/8f1d085f-a630-467c-a5c3-e4ec66c31c79)

p-value가 1.414810028e-45 유의 수준 0.05보다 작고 피어슨 상관 계수가 0.997568689로 1에 가깝게 나와 2021년 데이터를 사용했습니다.

코로나 사망률과 의사 수를 비롯한 다른 요인들의 결과 입니다.
![image](https://github.com/kcocu/corona/assets/40687753/d44b2729-df3d-45f1-b083-46c511001f03)

---------
아래는 코로나 사망률과 인종, 성별, 나이에 따른 분석 결과 입니다.
![image](https://github.com/kcocu/corona/assets/40687753/c2777751-6a8b-47a7-b554-67db6a465f88)
![image](https://github.com/kcocu/corona/assets/40687753/f12d1dc4-403b-42b4-9afd-75d9dfce2197)

---------
마지막 페이지는 각 나라를 검색 후 그 나라의 최신 확진자 수와 사망자 수를 가져옵니다.
![image](https://github.com/kcocu/corona/assets/40687753/820fb430-b250-4326-b56d-b45be3095ef4)

사용하기 위해서는 검색 창에 clear를 먼저 입력해야합니다.
아래에는 한국 코로나 하루 증가량을 최신 데이터로 가져와 보여줍니다.
스케쥴을 이용해 코로나 데이터를 자동 수집하도록 처리했습니다. (지금은 수집 안 함)
![image](https://github.com/kcocu/corona/assets/40687753/fc5b6868-0c19-45c1-81e6-62d0bb07afe7)

프로젝트 조원은 황예찬, 신찬희, 홍성우 입니다.
분석과제에서 데이터 수집은 모두 같이 했지만, 나머지는 혼자 했습니다.
이 웹사이트의 경우 개인 프로젝트로 혼자 만들었습니다.

자세한 내용은 개인 블로그
https://kcocu.tistory.com/36
에 올려놨습니다.
