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

document.getElementById('submit_button').addEventListener('click', submitRoute);
