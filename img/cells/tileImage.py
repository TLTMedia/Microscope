import os
baseImage="specimen.png"
for j in range(6):
    i=j+1
    per=100.0/2**(i)
    inversePer=100.0/2**(6-i)
    ex="convert %s  -alpha set -background none -channel A -evaluate multiply 0.75 -resize %s%% %s_%s"%(baseImage,inversePer,i,baseImage);
    print ex
    os.system(ex)
    ex="convert %s_%s -crop %s%%x%s%% %s/cell%%04d.png"%(i, baseImage, per,per,2**(i-1));
    print ex
    os.system(ex)
