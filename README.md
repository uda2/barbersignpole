BarBerSignpole
=========

散髪屋さんのサインポールの動きを再現する jQuery プラグインです。  
[サンプル](http://uda2.com/kirin/ "サンプル")

使い方
---------------------------------
jQuery と barbersignpole.js をダウンロードして、HTMLファイルから読み込んで下さい。

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="barbersignpole.js"></script>

後はサインポールにしたい要素を指定すれば完成です。

    $("#pole1").barbersignpole();

オプション
---------------------------------
<table>
  <tr>
    <th>オプション</th><th>説明</th>
  </tr>
  <tr>
    <td>patern</td><td>模様</td><td>色と幅（％）のオブジェクト（{color:"#F843DD",width:2}）を配列にして指定してください。</td>
  </tr>
  <tr>
    <td>vect</td><td>方向指定</td><td>テンキーを基準に7が左上、9が右上、3が右下、1が左下になります。</td>
  </tr>
  <tr>
    <td>speed</td><td>速度</td><td>一連のアニメーションの時間（秒）です。</td>
  </tr>
</table>  
