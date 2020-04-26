#!/usr/bin/python
# -*- coding: utf-8 -*-
import requests
import urllib.request
import os
import sys
from bs4 import BeautifulSoup
import pandas as pd
pd.set_option('display.max_columns', None)  
import statistics as st
from datetime import datetime
import numpy
import matplotlib.pyplot as plotVersus


# This method gives the data of latest condition which is currently available on the Hobolink cloud"
def getLatestConditionFromHobolink():
    page = urllib.request.urlopen('https://hobolink.com/p/b0a1dc20e6e7b315b81297194bbb9864')
    soup = BeautifulSoup(page, 'html.parser').find("div", {"id": "hobolink-latest-conditions-form:datatable-panel"})
    divs = []
    i = 0
    for link in soup.find_all("div"):
        i += 1
        if (i >= 6):
            divs.append(link)
    ans = []
    for div in divs:
        var = []
        for values in div.find_all("span"):
            var.append(values.text.encode('ascii','ignore'))
        ans.append(var)

    final_ans = []
    for i in range(len(ans)):
        var = []
        var.append(ans[i][0][:-1])
        var.append(ans[i][1] + b" " + ans[i][2])
        final_ans.append(var)
    return final_ans


def download_file(url, local_filename):
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)

def pre_process_data(lines):
    lines.pop(0)
    lines = list(reversed(lines))
    data = []
    for line in lines:
        var = line.encode('ascii','ignore')
        x = var.split(b',')
        x.pop(0)
        for i in range(len(x)):
            x[i] = x[i].rstrip()
        data.append(x)
    df = pd.DataFrame.from_records(data)
    df.columns = ['DATE & TIME (MM/DD/YY HH:MM:SS)','Wind Direction (WSW)','Wind Speed (m/s)', 'Gust Speed (m/s)','Temperature (°C)','RH (%)', 'Dew Point (°C)', 'Solar Radiation (W/m²)', 'Battery (V)']
    return (df)

# This method gives the last 24 hour data which is currently available on the Hobolink cloud"
def get_last_24_hour_data():
    N = 3480
    file_name = "weather_data_file"
    url = 'https://webservice.hobolink.com/restv2/public/devices/10458863/data_files/latest/txt'
    if os.path.exists(file_name):
        os.remove(file_name)
    download_file(url, file_name)
    list_of_lines = []
    with open(file_name, 'rb') as read_obj:
        read_obj.seek(0, os.SEEK_END)
        buffer = bytearray()
        pointer_location = read_obj.tell()
        while pointer_location >= 0:
            read_obj.seek(pointer_location)
            pointer_location = pointer_location -1
            new_byte = read_obj.read(1)
            if new_byte == b'\n':
                list_of_lines.append(buffer.decode()[::-1])
                if len(list_of_lines) == N:
                    os.remove(file_name)
                    return (pre_process_data(list_of_lines))
                buffer = bytearray()
            else:
                buffer.extend(new_byte)
        
        if len(buffer) > 0:
            list_of_lines.append(buffer.decode()[::-1])
    os.remove(file_name)
    return (pre_process_data(list_of_lines))

last_24_hour_data = get_last_24_hour_data()



# 8 properties from HOBOlink plus date
propertyList = [[],[],[],[],[],[],[],[],[]]

# Each day is defined by past 288 values
# That is, for 24 hours 288 values are collected

dayValues = (last_24_hour_data.tail(288)).values.tolist()
dayValues = numpy.array(dayValues)

enterList = 0
for singleProperty in range(9):
    propertyList[enterList] = dayValues[:, singleProperty]
    enterList += 1
dayValues.tolist()
for X in range(1, len(propertyList)):
    propertyList[X] = ([float(value) for value in propertyList[X]])

dates = []
for X in range(0, 288):
    dates.append(propertyList[0][X].decode("utf-8").split('b')[0])

propertyList[0] = dates

props = ['Date And Time','Wind Direction (WSW)','Wind Speed (m/s)', 'Gust Speed (m/s)','Temperature (°C)','RH (%)', 'Dew Point (°C)', 'Solar Radiation (W/m²)', 'Battery (V)']
colors = ['x',  'r', 'g', 'c', 'm', 'y', 'k', 'b', 'r']
for X in range(1, 9):
    plotVersus.plot(propertyList[0], propertyList[X], color = colors[X], label = props[X])
    axes = plotVersus.gca()
    axes.xaxis.set_major_locator(plotVersus.MaxNLocator(8))
    axes.set_title(props[X] + ' Vs Time (24 Hours)')
    axes.set_xlabel(props[0])
    axes.set_ylabel(props[X])


    fig = plotVersus.gcf()
    fig.set_size_inches(18.5, 10.5)
    
    plotVersus.legend()
    plotVersus.savefig('./Graphs/Daily' +str(X) + '.png')

    plotVersus.show()
    plotVersus.close()




