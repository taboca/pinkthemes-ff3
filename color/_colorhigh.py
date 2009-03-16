#!/usr/bin/env python
# encoding: utf-8
"""
untitled.py

Copyright (c) 2009 Taboca Communications. All rights reserved.
Generates a range of color values based on a single color

"""

import sys
import os, glob
import xml.dom.minidom

from xml.dom.minidom import parse, parseString, getDOMImplementation
from ConfigParser import ConfigParser

def main():

    color_r = int ( sys.argv[1])
    color_g = int ( sys.argv[2])
    color_b = int ( sys.argv[3])
 
    steps = int ( sys.argv[4])

    rMax = 255; 
    gMax = 255;
    bMax = 255; 
    
    rMin = 0; 
    gMin = 0; 
    bMin = 0;

    rUp = ( rMax - color_r ) / steps; 
    gUp = ( gMax - color_g ) / steps; 
    bUp = ( bMax - color_b ) / steps; 

    rDown = ( color_r - rMin ) / steps; 
    gDown = ( color_g - gMin ) / steps; 
    bDown = ( color_b - bMin ) / steps; 
    

    tableUp = { "normal": [ color_r, color_g, color_b ], "1": [ 0,0,0], "2": [0,0,0], "3": [0,0,0], "4":[0,0,0]  } 
 
    f = open ( "sedcolorhigh.sh" , "w");

    for cur in tableUp:

	if cur != "normal":
	 	numCur = int ( cur ) 
		if numCur: 
			rCur = color_r + rUp*numCur; 
			gCur = color_g + gUp*numCur; 
			bCur = color_b + bUp*numCur; 

			tableUp[cur][0] = rCur; 
			tableUp[cur][1] = gCur; 
			tableUp[cur][2] = bCur; 
	try:
         	print cur
   		print tableUp[cur][0]
	except os.error:
		print cur

	try: 
		infile = "./replace.sh > temp.css"
		cpline = "cp temp.css replace.sh"

		f.write( "sed -e \"s/colorhigh" + cur + "/rgb(" + str( tableUp[cur][0]) + "," + str (tableUp[cur][1]) + "," + str(tableUp[cur][2]) +")/\" " + infile + "\n"  )
		f.write( cpline + "\n" );

	except os.error:
		print " Error... "
	
	print "------------------"

    f.close()


if __name__ == '__main__':
	main()
