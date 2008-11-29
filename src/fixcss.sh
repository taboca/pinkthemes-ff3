#!/usr/bin/perl -w
use File::Copy;


$ff = $ARGV[0];

open (FIND,"cat $ff |");
while(<FIND>) {
 
   $a = $_;
   $a =~ s/<\?.*\?>//g;

   $a =~ s/\n//g;

   print "$a\n" ; 


}
close(FIND);


