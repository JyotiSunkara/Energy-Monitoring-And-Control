from pybacnet import bacnet
import time
#bacnet.Init(None, None)
import optparse
import json
import datetime
import sys
acno = int(sys.argv[1])
#acno = 1
desiredtemp = (sys.argv[2]+'.0')
parser = optparse.OptionParser()
parser.add_option('-i', '--interface', dest='interface',
                   default=None,
                    help='Network interface to broadcast over')
parser.add_option('-p', '--ip-filter', dest='fip', default=None,
                    help='Filter devices by IP prefix')

opts, args = parser.parse_args()

# MUST USE default port for whois
bacnet.Init(None, None)

data = json.load(open("/home/fanish/pybacnet/toolsmanasa/tools/test.json"))
#print(data)
result = data[0]
objects = result["objs"]
#print(len(objects))
objects = objects[1:len(objects)-4]
AC_status = {}
AC_status_instances = {}
Setpoint_temp = {}
j = 9
ac_input_map = {}
for i in range(0, 77):
	AC_status[i] = objects[j]
        ac_input_map[int(AC_status[i]['name'][-2]+AC_status[i]['name'][-1])]=i
	AC_status_instances[i]=AC_status[i]['props']
	Setpoint_temp[i] = objects[j+8]
	j = j + 28


acno = ac_input_map[acno]
h_dev = {u'mac': [10, 2, 24, 2, 168, 192], u'device_id': 242, u'adr': [], u'net': 0, u'max_apdu': 1024}
h_dev = bacnet.whois(5)[0]

#h_obj = bacnet.read_prop(h_dev, bacnet.OBJECT_DEVICE, h_dev['device_id'], bacnet.PROP_OBJECT_LIST, 2)
#h_obj={u'type_str': u'analog-value', u'instance': 17162, u'type': 2}
# h_obj1={u'type_str': u'analog-value', u'instance': 17162, u'type': 2}
# h_obj2={u'type_str': u'analog-value', u'instance': 18698, u'type': 2}
h_obj=AC_status_instances

#print h_obj
#print
#rint  bacnet.read_prop(h_dev, bacnet.OBJECT_DEVICE, h_dev['device_id'], bacnet.PROP_OBJECT_LIST, 0)
#print
#print
#print  bacnet.read_prop(h_dev, h_obj['type'], h_obj['instance'], bacnet.PROP_PRESENT_VALUE, -1)
print bacnet.write_prop(h_dev, h_obj[acno]['type'], h_obj[acno]['instance'],bacnet.PROP_PRESENT_VALUE,  bacnet.PROP_STATE_PROGRAM_CHANGE, desiredtemp,2)
# if(acno==1):
	# print bacnet.write_prop(h_dev, h_obj1['type'], h_obj1['instance'],bacnet.PROP_PRESENT_VALUE,  bacnet.PROP_STATE_PROGRAM_CHANGE, desiredtemp,2)
# else :
	# print bacnet.write_prop(h_dev, h_obj2['type'], h_obj2['instance'],bacnet.PROP_PRESENT_VALUE,  bacnet.PROP_STATE_PROGRAM_CHANGE, desiredtemp,2)

#time.sleep(10)
"""for i in dir(bacnet):
    try:
        aaa = bacnet.write_prop(h_dev, h_obj['type'], h_obj['instance'], eval('bacnet.' + i),  bacnet.BACNET_APPLICATION_TAG_BOOLEAN, '0', 16)
	if aaa:
	    print i
#time.sleep(20)
    except: pass """
