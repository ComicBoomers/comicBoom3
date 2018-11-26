# https://www.tutorialspoint.com/python/python_command_line_arguments.htm
# https://zulko.github.io/moviepy/
# https://github.com/bgrins/videoconverter.js

from moviepy.editor import *
import sys
# video.fx is loaded as vfx
def stackIt(path):
  clip = VideoFileClip(path).margin(10) # path is relative to where the file is being run
  length = clip.duration
  step = length / 3
  clip0 = clip.subclip(0,1)
  clip1 = clip.subclip(step,1+step)
  clip2 = clip.subclip(length - step - 1,length - step)
  clip3 = clip.subclip(length-1, length)
  booms_clip = clips_array([[clip0, clip1],[clip2, clip3]]).resize(width=375)
  return booms_clip

def gifIt(clip, outputPath):
  clip.write_gif(outputPath, 12) # path is relative to where to file is being run
  print(clip)
  sys.stdout.flush()

# grab the variables sent to it by the system process running the python script -- from the args array in options sent through python-shell
inputPath = sys.argv[1]
outputPath = sys.argv[2]

nodeRanIt = stackIt(inputPath)
gifIt(nodeRanIt, outputPath)

# example
# different = stackIt('./test.mov')
# gifIt(different, './test.gif')

# python python/creategifs.py ./tmp/temp.mov ./tmp/temp.gif ./stickers/comicframesh.png ./stickers/bubble.png
