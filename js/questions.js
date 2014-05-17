var attempts = 3;
var answer = null;
var quindex = 0;
var questions = new Array();
questions[0] = {
    question: "Який опір має вольтметр?",
    answer1: "Великий",
    answer2: "Малий",
    answer3: "Набагато більший, ніж опір частини кола, до якої він приєднаний",
    answer4: "Набагато менший, ніж опір частини кола, до якої він приєднаний",
    correctans: "Набагато менший, ніж опір частини кола, до якої він приєднаний"
};
questions[1] = {
    question: "Який опір має амперметр?",
    answer1: "Великий",
    answer2: "Малий",
    answer3: "Набагато більший, ніж опір частини кола, до якої він приєднаний",
    answer4: "Набагато менший, ніж опір частини кола, до якої він приєднаний",
    correctans: "Набагато менший, ніж опір частини кола, до якої він приєднаний"
}

questions[2] = {
    question: "При збільшенні опору реостата..",
    answer1: "покази амперметра та вольтметра збільшуються",
    answer2: "покази амперметра та вольтметра зменшуються",
    answer3: "покази амперметра збільшуються",
    answer4: "покази вольтметра збільшуються",
    correctans: "покази вольтметра збільшуються"
};
window.onload = function() {
    showQuestion(0);
};
function showQuestion(index) {
    document.getElementById("question").innerHTML = (index + 1) + ". " + questions[index].question;
    document.getElementById("labelans1").innerHTML = questions[index].answer1;
    document.getElementById("labelans2").innerHTML = questions[index].answer2;
    document.getElementById("labelans3").innerHTML = questions[index].answer3;
    document.getElementById("labelans4").innerHTML = questions[index].answer4;
    document.forms[0].ans1.value = questions[index].answer1;
    document.forms[0].ans1.checked = false;
    document.forms[0].ans2.value = questions[index].answer2;
    document.forms[0].ans2.checked = false;
    document.forms[0].ans3.value = questions[index].answer3;
    document.forms[0].ans3.checked = false;
    document.forms[0].ans4.value = questions[index].answer4;
    document.forms[0].ans4.checked = false;
}


function btnOK_onclick(event) {
    answer = null;
    if (document.forms[0].ans1.checked) {
        answer = document.forms[0].ans1.value;
    }
    if (document.forms[0].ans2.checked) {
        answer = document.forms[0].ans2.value;
    }
    if (document.forms[0].ans3.checked) {
        answer = document.forms[0].ans3.value;
    }
    if (document.forms[0].ans4.checked) {
        answer = document.forms[0].ans4.value;
    }
    if (answer == null) {
        alert("Виберіть ваш варіант відповіді.");
        return;
    } else {
        if (answer == questions[quindex].correctans) {
            quindex++;
            if (quindex < questions.length) {
                showQuestion(quindex);
            } else {
                location.href = "scheme.html";
            }

            return;
        } else {
            attempts--;
            var attemptLeft = document.getElementById("attempt");
            attemptLeft.textContent = attempts;
            if (attempts < 1) {
                alert("Кількість спроб вичерпано. Ви не можете почати виконання лабораторної роботи.");
                document.forms[0].btnOK.disabled = true;
            }
        }
    }
}