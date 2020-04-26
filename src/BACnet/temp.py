from pybacnet import bacnet
import time
#bacnet.Init(None, None)
import optparse
import json
import datetime

parser = optparse.OptionParser()
parser.add_option('-i', '--interface', dest='interface',
                   default=None,
                    help='Network interface to broadcast over')
parser.add_option('-p', '--ip-filter', dest='fip', default=None,
                    help='Filter devices by IP prefix')

opts, args = parser.parse_args()



# MUST USE default port for whois
bacnet.Init(None, None)





h_dev = {u'mac': [10, 2, 24, 2, 168, 192], u'device_id': 242, u'adr': [], u'net': 0, u'max_apdu': 1024}
h_dev = bacnet.whois(5)[0]
print h_dev
print
#h_obj = bacnet.read_prop(h_dev, bacnet.OBJECT_DEVICE, h_dev['device_id'], bacnet.PROP_OBJECT_LIST, 11)
#print bacnet.read_prop(h_dev, h_obj['type'], h_obj['instance'], bacnet.PROP_PRESENT_VALUE, -1)
#print bacnet.write_prop(h_dev, h_obj['type'], h_obj['instance'], bacnet.PROP_PRESENT_VALUE, bacnet.BACNET_APPLICATION_TAG_REAL, '30', 16)


#h_obj = bacnet.read_prop(h_dev, bacnet.OBJECT_DEVICE, h_dev['device_id'], bacnet.PROP_OBJECT_LIST, 2)
#h_obj={u'type_str': u'analog-value', u'instance': 17162, u'type': 2}
h_obj={u'type_str': u'binary-output', u'instance': 17153, u'type': 4}
print h_obj
#print
#rint  bacnet.read_prop(h_dev, bacnet.OBJECT_DEVICE, h_dev['device_id'], bacnet.PROP_OBJECT_LIST, 0)
#print
#print
print bacnet.write_prop(h_dev, h_obj['type'], h_obj['instance'],bacnet.PROP_PRESENT_VALUE,  bacnet.PROP_STATE_SYSTEM_STATUS, '0',2)
#time.sleep(10)
print  bacnet.read_prop(h_dev, h_obj['type'], h_obj['instance'], bacnet.PROP_PRESENT_VALUE, -1)
"""for i in dir(bacnet):
    try:
        aaa = bacnet.write_prop(h_dev, h_obj['type'], h_obj['instance'], eval('bacnet.' + i),  bacnet.BACNET_APPLICATION_TAG_BOOLEAN, '0', 16)
	if aaa:
	    print i
#time.sleep(20)
    except: pass """
