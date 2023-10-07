window.onload = () => {
    const longPress = {
        //プロパティ
        el: '',
        el2: '',
        count: 0,
        second: 1,
        interval: 10,
        timerId: 0,
        color: 'red',
        size: 100,
        callback: '',

        //メソッド
        init: function(param){
            //引数のパラメータ取得
            this.el = document.querySelector(param.el);
            this.el2 = document.getElementById("outer_circle");
            this.second = param.second;
            this.color = param.color;
            this.size = param.size;
            this.callback = param.callback;

            this.el2.style.width = this.size +'px';
            this.el2.style.height = this.size +'px';

            this.piebtn = document.querySelector('#inner_circle');
            this.piebtn.style.width = this.size * 0.8 +'px';
            this.piebtn.style.height = this.size * 0.8 +'px';

            const pos = (this.size - this.size*0.8) / 2;
            this.piebtn.style.top = pos +"px";
            this.piebtn.style.left = pos +"px";

            //イベントリスナー
            this.el.addEventListener('pointerdown', ()=>{ this.start() }, false);
            this.el.addEventListener('pointerup', ()=>{ this.end() }, false);
            this.el.addEventListener('pointerout', ()=>{ this.end() }, false);
            this.el.oncontextmenu = () => {return false;}
        },
        start: function(){
            this.timerId = setInterval(()=>{
                this.count++;
                this.el2.style.backgroundImage = 'conic-gradient('+ this.color +' 0% '+ this.count/this.second +'%, #d9d9d9 0% 100%)';

                if (this.count / 100 === this.second) {
                    //長押し判定時の処理
                    this.callback();
                }
            }, this.interval);
        },
        end: function(){
            clearInterval(this.timerId);
            this.count = 0;
            this.el.style.backgroundColor = '#676767';
            this.el2.style.backgroundImage = 'conic-gradient(#ff0019 0% 0%, #d9d9d9 0% 100%)';
        },
        update: function(param){
            if (param.color) {
                this.color = param.color;
            }
            if (param.second) {
                this.second = param.second;
            }
            if (param.size) {

                this.el2.style.width = param.size +'px';
                this.el2.style.height = param.size +'px';

                this.piebtn = document.querySelector('#inner_circle');
                this.piebtn.style.width = param.size * 0.8 +'px';
                this.piebtn.style.height = param.size * 0.8 +'px';

                const pos = (param.size - param.size*0.8) / 2;
                this.piebtn.style.top = pos +"px";
                this.piebtn.style.left = pos +"px";
            }
        }
    }

    //初期化
    longPress.init({
        el: '#inner_circle', //長押しの判定を取りたい要素のセレクタを指定する
        second: 3, //長押しの秒数を指定する
        color: 'rgb(255 177 40)',
        callback: function(){
            console.log('ボタンを' + this.second + '秒長押ししました！'); 
        },
        size: 100
    });

    //色の更新
    const colorPalette = document.getElementById('colorPalette');
    colorPalette.addEventListener("change", (event) => {
        longPress.update({
            color: colorPalette.value
        });
    });

    //時間の更新
    const timer = document.getElementById('timer');
    timer.addEventListener("change", (event) => {
        longPress.update({
            second: Number(timer.value)
        });
    });

    //時間の更新
    const size = document.getElementById('size');
    size.addEventListener("change", (event) => {
        longPress.update({
            size: Number(size.value)
        });
    });
}

