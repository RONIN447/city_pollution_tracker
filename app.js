fetch('http://localhost:3000/areas')
      .then(response => response.json())
      .then(data => {
        const areaSelect = document.getElementById('areaSelect');
        data.forEach(area => {
          const option = document.createElement('option');
          option.value = area.area_id;
          option.textContent = area.area_name;
          areaSelect.appendChild(option);
        });
      });

    // Fetching the  pollution data
    const pollutionUnits = {
        " Noise Level" : "dB",
        " Wind Speed": "knots",
        " Air Quality": "AQI",
        
    };

    document.getElementById('areaSelect').addEventListener('change', (e) => {
      const areaId = e.target.value;
      fetch(`http://localhost:3000/pollution/${areaId}`)
        .then(response => response.json())
        .then(data => {
          const pollutionData = document.getElementById('pollutionData');
          pollutionData.innerHTML = '';
          data.forEach(record => {
            const div = document.createElement('div');
            div.className = 'card';
            div.textContent = `${record.pollution_type}: ${record.reading} (Recorded on: ${record.timestamp})`;
            pollutionData.appendChild(div);
          });
        });
    });


    // Submit observation by the user
    document.getElementById('submissionForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const areaId = document.getElementById('areaSelect').value;
      const pollutionType = document.getElementById('pollutionType').value;
      const description = document.getElementById('description').value;
      const submittedBy = document.getElementById('submittedBy').value;

    //   Using the post method to update the records 

      fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area_id: areaId, pollution_type: pollutionType, description, submitted_by: submittedBy }),
      })
        .then(response => response.json())
        .then(data => alert(data.message));
    });