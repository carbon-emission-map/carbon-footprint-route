async function submitRoute() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const checkpoints = [];  // 獲取所有檢測點
    for (let i = 1; i <= 10; i++) {
        let checkpoint = document.getElementById(`checkpoint${i}`).value;
        if (checkpoint) checkpoints.push(checkpoint);
    }
    
    const weights = {
        emissions: parseFloat(document.getElementById('weight_emissions').value),
        time: parseFloat(document.getElementById('weight_time').value),
        distance: parseFloat(document.getElementById('weight_distance').value)
    };

    const response = await fetch('https://你的HerokuApp域名/route_planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start, end, checkpoints, weights })
    });

    const data = await response.json();
    if (response.ok) {
        // 顯示結果
        console.log(data.best_route);
    } else {
        // 顯示錯誤
        console.error(data.error);
    }
}
// 初始化 Leaflet 地圖
const map = L.map('map').setView([25.033, 121.5654], 13); // 預設位置為台北市
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// 模擬加入路線數據（需用伺服器回傳的資料替換）
const polylineData = [[25.033, 121.5654], [25.032, 121.566], [25.034, 121.567]];
const polyline = L.polyline(polylineData, { color: 'blue' }).addTo(map);
map.fitBounds(polyline.getBounds());

// 顯示路線結果
document.getElementById('result').innerHTML = `
  <p>起點：台北市</p>
  <p>終點：目的地</p>
  <p>碳排放量：20g CO2</p>
  <p>距離：2 公里</p>
  <p>時間：15 分鐘</p>
`;

// 添加下載地圖功能
document.getElementById('saveMap').addEventListener('click', () => {
    alert('目前 Leaflet 無法直接下載地圖，建議使用螢幕截圖工具。');
});

document.getElementById('submit_button').addEventListener('click', submitRoute);
