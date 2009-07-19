sed -e "s/colorhigh1/rgba(255,255,255,.2)/" ./replace.sh > temp.css
cp temp.css replace.sh
sed -e "s/colorhigh3/rgba(255,255,255,.4)/" ./replace.sh > temp.css
cp temp.css replace.sh
sed -e "s/colorhigh2/rgba(255,255,255,.6)/" ./replace.sh > temp.css
cp temp.css replace.sh
sed -e "s/colorhigh4/rgba(255,255,255,.8)/" ./replace.sh > temp.css
cp temp.css replace.sh
sed -e "s/colorhighnormal/rgba(255,255,255,0)/" ./replace.sh > temp.css
cp temp.css replace.sh
