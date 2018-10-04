var nickInput = document.getElementById("nickInput");
var messageInput = document.getElementById("messageInput");
var chatArea = document.getElementById("chatArea");
var sendButton = document.getElementById("sendButton");

var	chatHistory;

if(localStorage.getItem("chat")) {
	displayHistory();	
} else {
	chatHistory = JSON.stringify([]);
	localStorage.setItem("chat", chatHistory);
}

function displayHistory() {
	chatHistory = JSON.parse(localStorage.getItem("chat"));
	var template = "";
	for (i = 0; i < chatHistory.length; i++) {
		template += "<div><strong>" + chatHistory[i].nick + ": </strong>" + chatHistory[i].mess + "</div>";	
	}
	chatArea.innerHTML = template;
	chatArea.scrollTop = chatArea.scrollHeight;	
}	

setInterval(displayHistory, 1000);

sendButton.addEventListener("click", function() {
	if (document.getElementById("nickInput").value == ""){
		alert("please enter nickname");
		return;
	}
	if (document.getElementById("messageInput").value == ""){
		alert("please enter message");
		return;
	}
	var message={
		nick: nickInput.value,
		mess: messageInput.value
	};
	//nickInput.value = "";
	messageInput.value = "";
	sendButton.disabled = "disabled";
	chatHistory.push(message);
	localStorage.setItem("chat", JSON.stringify(chatHistory));
	var template="<div><strong>" + message.nick + ": </strong>" + message.mess + "</div>";
	chatArea.innerHTML += template;
	chatArea.scrollTop = chatArea.scrollHeight;	
});

clearButton.addEventListener("click", function() {
	localStorage.removeItem("chat");
	chatArea.innerHTML = "";	
	chatHistory.clear();
});

nickInput.addEventListener("keyup", function() {
	document.getElementById("sendButton").disabled = nickInput.value && messageInput.value ? false : "disabled";
});

messageInput.addEventListener("keyup", function() {
	document.getElementById("sendButton").disabled = nickInput.value && messageInput.value ? false : "disabled";
});
