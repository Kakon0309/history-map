<<<<<<< HEAD
// 地図の初期化（横浜の中心座標：緯度35.4437, 経度139.6380、ズームレベル14）
const map = L.map('map').setView([35.4437, 139.6380], 14);

// ① 現代の地図（国土地理院の標準地図）を追加
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    maxZoom: 18
}).addTo(map);

// ② 古地図レイヤー定義（全国対応・国土地理院）
const oldMapLayers = {
    '1945': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1945-1950年）</a>",
        minZoom: 10,
        maxZoom: 17,
        opacity: 0.7
    }),
    '1961': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1961-1969年）</a>",
        minZoom: 10,
        maxZoom: 17,
        opacity: 0.7
    }),
    '1974': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1974-1978年）</a>",
        maxZoom: 17,
        opacity: 0.7
    }),
    '1979': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1979-1983年）</a>",
        maxZoom: 17,
        opacity: 0.7
    }),
    '1984': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1984-1986年）</a>",
        maxZoom: 17,
        opacity: 0.7
    }),
    '1987': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1987-1990年）</a>",
        maxZoom: 17,
        opacity: 0.7
    }),
    '2004': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/airphoto/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（簡易空中写真 2004年～）</a>",
        minZoom: 14,
        maxZoom: 18,
        opacity: 0.7
    }),
    '2015': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2015/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（2015年）</a>",
        minZoom: 14,
        maxZoom: 18,
        opacity: 0.7
    })
};

// 現在表示中の古地図レイヤー（デフォルトは1974年）
let currentOldMapLayer = oldMapLayers['1974'];
currentOldMapLayer.addTo(map);

// ④ スライダーと連動させる処理（選択中の古地図に適用）
const slider = document.getElementById('opacity-slider');
slider.addEventListener('input', function(event) {
    currentOldMapLayer.setOpacity(event.target.value);
});

// ⑤ セレクトボックスで古地図を切り替え
document.getElementById('old-map-select').addEventListener('change', function() {
    map.removeLayer(currentOldMapLayer);
    currentOldMapLayer = oldMapLayers[this.value];
    currentOldMapLayer.setOpacity(slider.value);
    currentOldMapLayer.addTo(map);
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
=======
// 地図の初期化（横浜の中心座標：緯度35.4437, 経度139.6380、ズームレベル14）
const map = L.map('map').setView([35.4437, 139.6380], 14);

// ① 現代の地図（国土地理院の標準地図）を追加
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    maxZoom: 18
}).addTo(map);

// ② 古地図レイヤー定義（全国対応・国土地理院）
const oldMapLayers = {
    '1945': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1945-1950年）</a>",
        minZoom: 10,
        maxZoom: 17,
        opacity: 0.7
    }),
    '1961': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1961-1969年）</a>",
        minZoom: 10,
        maxZoom: 17,
        opacity: 0.7
    }),
    '1974': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1974-1978年）</a>",
        maxZoom: 17,
        opacity: 0.7
    }),
    '1979': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1979-1983年）</a>",
        maxZoom: 17,
        opacity: 0.7
    }),
    '1984': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1984-1986年）</a>",
        maxZoom: 17,
        opacity: 0.7
    }),
    '1987': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（1987-1990年）</a>",
        maxZoom: 17,
        opacity: 0.7
    }),
    '2004': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/airphoto/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（簡易空中写真 2004年～）</a>",
        minZoom: 14,
        maxZoom: 18,
        opacity: 0.7
    }),
    '2015': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2015/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院（2015年）</a>",
        minZoom: 14,
        maxZoom: 18,
        opacity: 0.7
    }),
    'meiji': L.tileLayer('https://ktgis.net/kjmapw/kjtilemap/kanto/00/{z}/{x}/{y}.png', {
        attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>（埼玉大学 谷謙二）",
        minZoom: 8,
        maxZoom: 15,
        opacity: 0.7,
        tms: true
    })
};

// 現在表示中の古地図レイヤー（デフォルトは1974年）
let currentOldMapLayer = oldMapLayers['1974'];
currentOldMapLayer.addTo(map);

// ④ スライダーと連動させる処理（選択中の古地図に適用）
const slider = document.getElementById('opacity-slider');
slider.addEventListener('input', function(event) {
    currentOldMapLayer.setOpacity(event.target.value);
});

// ⑤ セレクトボックスで古地図を切り替え
document.getElementById('old-map-select').addEventListener('change', function() {
    map.removeLayer(currentOldMapLayer);
    currentOldMapLayer = oldMapLayers[this.value];
    currentOldMapLayer.setOpacity(slider.value);
    currentOldMapLayer.addTo(map);
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
>>>>>>> c80d5373ecf97732bd51f566222629888aa82fa6
});