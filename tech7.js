document.getElementById("button").onclick = function () {  //クリックしてスタート

    //初期値設定
    const limit = 50; //表示件数
    const graph_api = 'https://graph.facebook.com/ig_hashtag_search?';
    const accessToken = 'EAAnGQ8kLkaUBAIY8dCfTvIYYri2LE322JrPErhftRqOj2GCyyil045DGekgaH6KYkNotsKASgDlPw6e4ZAtLxMhfuH4ZAwsj0E20p2ifYBmHxinZCdT7TKmILcLcZBnf8zUANt6EuLLlcH6wByM8uSG2AedtUluQUToTAYcgXBKzteGkmeadzXsYEC9kmHcZD'; // アクセストークン
    const businessID = '17841441477914224'; //グラフAPIエクスプローラで取得したinstagram_business_accountのID
    let text = ''; //表示処理の際利用
    let hashtag = [];
    let input_message = [];
    let dataMedias = {};
    let dataId;
    input_message = document.getElementById("input_message").value; //テキストボックス内のキーワードを格納
    hashtag = input_message.split(/\s+/);
    console.log(hashtag);
    //console.log(hashtag.length);

    //メイン処理
    function func1(t) {
        return new Promise(function (resolve, reject) {
            const url0 = graph_api + "user_id=" + businessID + "&q=" + t + "&access_token=" + accessToken;
             //タグID検索
             fetch(url0)
                .then((response) => {
                    return response.json() //ここでBodyからJSONを返す
                 })
                 .then((result) => {
                    dataId = result; //JSONをdataIdに代入
                    const url1 = 'https://graph.facebook.com/'
                    const url2 = '/recent_media?user_id=' + businessID + '&fields=media_url,permalink&limit=' + limit + '&access_token=' + accessToken;
                    const url3 = url1 + dataId.data[0].id + url2;//投稿検索URLの作成

                    fetch(url3) //投稿検索URLの展開
                        .then((response) => {
                            return response.json()
                        })

                        .then((result) => {
                            console.log(t + "first");
                            //console.log(result);
                            dataMedias[t] = result;

                 })
        });
    }


    //開始位置
    if (hashtag.length < 5) {
        Promise.all(hashtag.map(function (tag) {
            return new Promise(resolve => {
                return func1(tag)
                    .then(result => {
                        resolve(result);
                    });
            });
        }));
    }else{
        console.log("五つ以下のタグを入力してください");
    }
            
}