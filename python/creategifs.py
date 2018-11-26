# https://www.tutorialspoint.com/python/python_command_line_arguments.htm
# https://zulko.github.io/moviepy/
# https://github.com/bgrins/videoconverter.js

from moviepy.editor import *
import sys
# video.fx is loaded as vfx
def stackIt(path): # , framesPath, stickerPath):
  clip = VideoFileClip(path).margin(10) # path is relative to where the file is being run
  length = clip.duration
  step = length / 3
  clip0 = clip.subclip(0,1)
  clip1 = clip.subclip(step,1+step)
  clip2 = clip.subclip(length - step - 1,length - step)
  clip3 = clip.subclip(length-1, length)
  booms_clip = clips_array([[clip0, clip1],[clip2, clip3]]).resize(width=375) #480)
  return booms_clip
  # create a list of the horizontal comic frames
  #frame = [framesPath, framesPath, framesPath, framesPath, framesPath, framesPath, framesPath,framesPath, framesPath, framesPath]
  # summon an image clip for the image of duration of .1 second for each frame
  #frames = [ImageClip(m).set_duration(.1) for m in frame]
  # turn the list of comic frames into a video of length 1 s
  #frames_clip = concatenate_videoclips(frames, method="compose")
  # same with stickers
  #sticker = [stickerPath, stickerPath, stickerPath, stickerPath, stickerPath, stickerPath, stickerPath, stickerPath, stickerPath, stickerPath]
  # summon an image clip for the image of duration of .1 second for each sticker
  #stickers = [ImageClip(z).set_duration(.1) for z in sticker]
  # turn the list of comic frames into a video of length 1 s
  #sticker_clip = concatenate_videoclips(stickers, method="compose").resize(width=100)

  # overlay the comic frames on
  #final_clip = CompositeVideoClip([booms_clip,frames_clip, sticker_clip])
  #return final_clip

def gifIt(clip, outputPath):
  clip.write_gif(outputPath, 12) # path is relative to where to file is being run
  print(clip)
  sys.stdout.flush()

# grab the variables sent to it by the system process running the python script -- from the args array in options sent through python-shell
inputPath = sys.argv[1]
outputPath = sys.argv[2]
#framesPath = sys.argv[3]
#stickerPath = sys.argv[4]

nodeRanIt = stackIt(inputPath)#, framesPath, stickerPath)
gifIt(nodeRanIt, outputPath)

# example
# different = stackIt('./test.mov')
# gifIt(different, './test.gif')

# python python/creategifs.py ./tmp/temp.mov ./tmp/temp.gif ./stickers/comicframesh.png ./stickers/bubble.png
