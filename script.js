function predictResult() {
        try {
          const data = JSON.parse(document.getElementById("dataInput").value);
          const score = parseFloat(document.getElementById("scoreInput").value);

          if (isNaN(score)) {
            alert("Please enter a valid score.");
            return;
          }

          const X = data.scores;
          const y = data.results;

          const mean = (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

          const meanX = mean(X);
          const meanY = mean(y);

          let numerator = 0;
          let denominator = 0;

          for (let i = 0; i < X.length; i++) {
            numerator += (X[i] - meanX) * (y[i] - meanY);
            denominator += Math.pow(X[i] - meanX, 2);
          }

          const B1 = numerator / denominator;
          const B0 = meanY - B1 * meanX;

          function sigmoid(z) {
            return 1 / (1 + Math.exp(-z));
          }

          const z = B0 + B1 * score;
          const probability = sigmoid(z);
          const result = probability >= 0.5 ? "Pass" : "Fail";

          const resultElement = document.getElementById("result");
          resultElement.textContent = `Score: ${score}, Result: ${result} (Probability: ${probability.toFixed(2)})`;
          resultElement.classList.remove("d-none", "alert-success", "alert-danger");
          resultElement.classList.add(score >= 70 ? "alert-success" : "alert-danger");
        } catch (error) {
          alert("Invalid input: Please ensure the dataset is in correct JSON format");
        }
      }
