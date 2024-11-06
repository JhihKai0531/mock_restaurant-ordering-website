# mock_restaurant-ordering-website

這是一個**模擬餐廳店內點餐網站**專案，餐廳名稱為「肉之家異國料理」。顧客進入網站後，可以瀏覽完整菜單，點擊餐點卡片進行客製化的餐點設定（如套餐選擇、辣度、加量等），並將餐點加入購物車。確認訂單後，顧客可以查看已送出的訂單紀錄以及總共的金額。最後可以按下結帳按鈕選擇現場或是線上付款，若選擇線上付款，會出現模擬的付款處理畫面，隨機回傳結果。

本專案使用的餐點資料來自於免費食譜API網站 TheMealDB.com。該網站主要提供各種食物的食譜，而本專案雖然不是食譜網站，但可以借用該API當中的一些圖片、食物名稱、食物種類等資料，來製作成模擬的餐點資訊。

專案的靈感來自於有次在義式餐廳用餐時，看到餐廳使用QR Code掃碼點餐，想到最近剛好在尋覓專案主題，而小餐廳的點餐網站正好具有基本的網站規格，同時也是近年許多餐廳業者逐漸採用的點餐方式，便想嘗試復刻看看基本的結構。或許日後真的需要製作這樣的案子時，可以從現在累積的經驗來延伸。

本專案使用Vue CLI來建構，並結合Vue Router進行前端的路由切換。在Vue的撰寫方式上使用Options API。樣式方面主要使用Bootstrap 5，搭配部分自訂的CSS。<br>
目前還有許多需要學習之處，期許未來能夠在軟體開發能力上有更多的成長。

所使用的TheMealDB.com網站連結：[https://www.themealdb.com](https://www.themealdb.com)<br>
所使用的網站icon來源：[https://www.flaticon.com/free-icon/meal_3274099?term=meals&page=1&position=11&origin=search&related_id=3274099](https://www.flaticon.com/free-icon/meal_3274099?term=meals&page=1&position=11&origin=search&related_id=3274099)<br>
所使用的其他圖片來源：
1. counter：[https://www.flaticon.com/free-icon/counter_3492385?term=counter&related_id=3492385](https://www.flaticon.com/free-icon/counter_3492385?term=counter&related_id=3492385)
2. credit：[https://www.flaticon.com/free-icon/credit_1198299](https://www.flaticon.com/free-icon/credit_1198299)
3. credit-card：[https://www.flaticon.com/free-icon/credit-card_4117864?term=digital+payment&related_id=4117864](https://www.flaticon.com/free-icon/credit-card_4117864?term=digital+payment&related_id=4117864)
4. error-404：[https://www.flaticon.com/free-icon/error-404_3855833?term=error+404&page=1&position=4&origin=search&related_id=3855833](https://www.flaticon.com/free-icon/error-404_3855833?term=error+404&page=1&position=4&origin=search&related_id=3855833)