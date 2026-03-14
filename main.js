// 地図の初期化（横浜の中心座標：緯度35.4437, 経度139.6380、ズームレベル14）
const map = L.map('map').setView([35.4437, 139.6380], 14);

// ① 現代の地図（国土地理院の標準地図）を追加
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    maxZoom: 18
}).addTo(map);

// ② 古地図レイヤー（1974年〜1978年の航空写真）
const oldMap1970s = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1974-1978年）</a>",
    maxZoom: 17,
    opacity: 0.7
});

// ③ 古地図レイヤー（明治時代・関東平野迅速測図相当／今昔マップ 1894-1915年）
const oldMapMeiji = L.tileLayer('https://ktgis.net/kjmapw/kjtilemap/kanto/00/{z}/{x}/{y}.png', {
    attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>（埼玉大学 谷謙二）",
    minZoom: 8,
    maxZoom: 15,
    opacity: 0.7,
    tms: true  // 今昔マップはタイルの始点が南西のため
});

// 現在表示中の古地図レイヤー（デフォルトは1970年代）
let currentOldMapLayer = oldMap1970s;
currentOldMapLayer.addTo(map);

// ④ スライダーと連動させる処理（選択中の古地図に適用）
const slider = document.getElementById('opacity-slider');
slider.addEventListener('input', function(event) {
    currentOldMapLayer.setOpacity(event.target.value);
});

// ⑤ ラジオボタンで古地図を切り替え
document.querySelectorAll('input[name="old-map"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        map.removeLayer(currentOldMapLayer);
        currentOldMapLayer = this.value === 'meiji' ? oldMapMeiji : oldMap1970s;
        currentOldMapLayer.setOpacity(slider.value);
        currentOldMapLayer.addTo(map);
    });
});

/* --- これより下を一番最後に追加 --- */

// 現在地のマーカーと円を保存しておく変数
let currentMarker = null;
let currentCircle = null;

// 「現在地を表示」ボタンが押されたときの処理
document.getElementById('locate-btn').addEventListener('click', function() {
    // Leafletの機能を使って現在地を取得（成功すると 'locationfound' イベントが発生）
    map.locate({setView: true, maxZoom: 16});
});

// 現在地が取得できたときの処理
map.on('locationfound', function(e) {
    const radius = e.accuracy / 2; // 誤差の範囲

    // 既にマーカーがあれば、古いものを消す
    if (currentMarker) {
        map.removeLayer(currentMarker);
        map.removeLayer(currentCircle);
    }

    // 新しい現在地にマーカーと青い円を追加
    currentMarker = L.marker(e.latlng).addTo(map).bindPopup("現在地はここです！").openPopup();
    currentCircle = L.circle(e.latlng, radius).addTo(map);
});

// 現在地の取得に失敗したときの処理
map.on('locationerror', function(e) {
    alert("位置情報が取得できませんでした。ブラウザの位置情報へのアクセスが許可されているか確認してください。");
});