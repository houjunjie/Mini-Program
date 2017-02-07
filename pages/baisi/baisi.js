const util = require("../../utils/util.js");

var playingID = -1;
var types = ["1","41","10","29","31"];
var page = 1;//页码

const DATATYPE = {
    ALLDATATYPE : "1",
    VIDEODATATYPE : "41",
    PICTUREDATATYPE : "10",
    TEXTDATATYPE : "29",
    VOICEDATATYPE : "31"
}


Page({
    //页面初始化
    data:{
        allDataList:[],
        videoDataList:[],
        pictureDataList:[],
        textDataList:[],
        voiceDataList:[],
        topTabItems:["全部","视频","图片","段子","声音"],
        currentTopItem: "0",
        imageViewHeight:400,
        imgBigSrc:'',
        imgBigW:'',
        imgBigH:'',
        imgBigViewShow:'none',
        isViewScroll:true
    },
    // 声明周期函数监听页面加载加载
    onLoad: function(options){
        console.log(3111);
        this.refershNewData();
    },
    // 声明周期函数，监听页面初次渲染完毕
    onReady: function(){

    },
    //切换顶部标签标签
    switchTab: function(e){
        this.setData({
            currentTopItem:e.currentTarget.dataset.idx
        })
    },
    // 刷新数据
    refershNewData: function(){
        let that = this;
        let parameters = 'a=list&c=data&type='+types[this.data.currentTopItem];
        console.log("parameters = " + parameters);
        util.request(parameters,(res) => {
            page = 1;
            console.log(res);
            // this.
            this.setNewData(res);
            console.log(this.data);
        })
    },
    // 设置新数据
    setNewData: function(res){
        switch(types[this.data.currentTopItem]){
            //
            case DATATYPE.ALLDATATYPE :
                this.setData({
                    allDataList: res.data.list
                })
                break;
            case DATATYPE.VIDEODATATYPE :
                this.setData({
                    videoDataList: res.data.list
                })
                break;
            case DATATYPE.PICTUREDATATYPE :
                this.setData({
                    pictureDataList: res.data.list
                })
                break;
            case DATATYPE.TEXTDATATYPE :
                this.setData({
                    textDataList: res.data.list
                })
                break;
            case DATATYPE.VOICEDATATYPE :
                this.setData({
                    voiceDataList: res.data.list
                })
                break;
            default :
                break;
        }
    },
    // 视频开始播放播放
    videoPlay: function(obj){
        console.log("playingId = " +playingID);
        console.log(obj);

        playingID = obj.currentTarget.id;
        // 暂停音频播放
        if(this.audioContext){
            this.audioContext.pause();
        }
        // 暂停上一条的视频播放播放
        if(this.videoContext){
            console.log(this.videoContext);
            this.videoContext.pause();
        }
        this.videoContext = wx.createVideoContext(obj.currentTarget.id);
    },
    // 视频播放结束
    videoEnd: function(obj){
        this.videoContext.seek(0);
    },
    // 音频播放播放
    audioPlay: function(obj){
        // 结束视频播放播放
        if(this.videoContext){
            this.videoContext.pause();
        }
        playingID = obj.currentTarget.id;
        this.audioContext = wx.createAudioContext(obj.currentTarget.id);
        
    },
    // 音频播放结束
    audioEnd: function(obj){
        this.audioContext.seek(0)
    },
    // showBigImg
    showBigImg: function(e){
        this.setData({
            imgBigSrc:e.target.dataset.src,
            imgBigW:e.target.dataset.width,
            imgBigH:e.target.dataset.height,
            imgBigViewShow:'block',
            isViewScroll:false
        })
    },
    hideBigImg: function(){
        this.setData({
            imgBigViewShow:'none',
            isViewScroll:true
        })
    }
})