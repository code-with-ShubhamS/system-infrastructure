1. winget search yt-dlp (give the yt-dlp id )
2. winget install yt-dlp.yt-dlp (copy yt dlp-id and paste)
3. winget search ffmpeg (give the id of FFmpeg)
4. winget install Gyan.FFmpeg (paste ffmpeg id)

# To verify installation
yt-dlp --version <br/>
ffmpeg --version (if not install than install manually or check the youtube video is downloading or not)

# checking the path where it was install 
where.exe yt-dlp

# Note 
if you download any youtube videos than it is store " C:\Users\DESKTOP " This path by default 

# commands to install youtube videos,Insta reel,playlist 


1. This command download the youtube videos to a desired path <br/>
yt-dlp -o "C:\Your\Desired\Path\%(title)s.%(ext)s" video-url


2. This command download the youtube video or playlist as a audio <br/>
yt-dlp -x --audio-format mp3 --restrict-filenames -o "C:\Your\Desired\Path\%(title)s.%(ext)s" "https://www.youtube.com/playlist?list=PLYOTv5SZmNtN6aK1FIkA99LuxzhF71l4p"

..many more commands

# Upadte yt-dlp
yt-dlp -U