const prizes = [
  ["SSR", 1, "โคตรเก นิสสานนนนน!"],
  ["SR", 4, "เกหายากระดับพี่โต"],
  ["R", 10, "เกทั่วไป"],
  ["C", 85, "นักหัดเก"],
];

function gacha() {
  try {
    // Get the money input element and its value
    const moneyInputElement = document.getElementById("money");
    const userEnteredMoney = parseInt(moneyInputElement.value);

    // Validate the input value (non-negative number)
    if (isNaN(userEnteredMoney) || userEnteredMoney < 0) {
      throw new Error("จำนวนน้ำคัมไม่ถูกต้อง กรุณาตอกเกจำนวนที่เป็นบวก");
    }

    // Check if the user has enough money
    if (userEnteredMoney < 20) {
      alert("จำนวนน้ำคัมไม่เพียงพอ");
      return;
    }

    // Check if the user has more money
    if (userEnteredMoney > 20) {
      alert("จำนวนน้ำคัมเกินกำหนด");
      return;
    }
    
    // Calculate the total chances
    const totalChances = prizes.reduce((sum, [_, chance]) => sum + chance, 0);

    // Generate a random number within the total chances range
    const randomNumber = Math.floor(Math.random() * totalChances) + 1;

    // Determine the winning prize based on the random number
    let cumulativeChance = 0;
    for (const [prize, chance, item] of prizes) {
      cumulativeChance += chance;
      if (randomNumber <= cumulativeChance) {
        const resultElement = document.getElementById("result");
        resultElement.textContent = `คุณเก ${userEnteredMoney} คัม และได้ ${prize} (${item})`;
        resultElement.classList.add("gacha-result-animation"); // Apply animation class
        resultElement.style.display = "block"; // Show the result element

        // Clear animation class to allow re-triggering the animation
        setTimeout(() => {
          resultElement.classList.remove("gacha-result-animation");
        }, 500); // Match the duration of the animation

        return; // Exit the function after determining the prize
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message); // Display error message to the user
  }
}

// Attach event listener to the pull button
const pullButton = document.getElementById("pullButton");
pullButton.addEventListener("click", gacha);
