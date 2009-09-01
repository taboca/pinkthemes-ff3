./00_clean.sh ./00_clean.sh 
./10_pick_theme.sh times_timao
./20_clean.sh 
./30_precompile.sh 
./fixcss-times_timao.sh
./30_zipinstall.sh 
./50_merge_theme_rdf.sh times_timao
ant -f build-preview-times_timao.xml
ant distrib
cp build-package-installer/theme.jar ./products/times_timao/release-latest/

