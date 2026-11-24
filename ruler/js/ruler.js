"use strict"; // Remove if this becomes an ES6 module.

function generate()
{
    updateStatus("");

    const rulerImplementation = getImplementation();
    const combos = rulerImplementation.generateCompleteCombos();
    const ulCombos = document.getElementById("combos");
    ulCombos.innerHTML = "";

    const startTimeMs = Date.now();
    const comboCount = insertCombos(ulCombos, length, combos);
    const elapsedTimeMs = Date.now() - startTimeMs;

    updateStatus(`Returned ${comboCount} rulers of length ${rulerImplementation.length} with ${rulerImplementation.tickCount} tick marks in ${elapsedTimeMs / 1000} seconds.`);
}

function updateStatus(status, isError = false)
{
    const divStatus = document.getElementById("status");
    divStatus.innerText = status;
    if (isError)
    {
        divStatus.classList.add("error");
    }
    else
    {
        divStatus.classList.remove("error");
    }
}

function validationError(implementation, length, tickCount)
{
    if (implementation == "RulerJsInt" && length > 29)
        return "Length may be at most 29 for JavaScript non-BitInt implemenation.";
    else if (tickCount > (length + 1))
        return "Tick count may be at most Length + 1."
    else
        return "";
}

function getImplementation()
{
    const length = parseInt(document.getElementById("length").value);
    const tickCount = parseInt(document.getElementById("tickCount").value);
    const implementation = document.getElementById("implementation").value;
    const error = validationError(implementation, length, tickCount);
    if (error)
    {
        updateStatus(error, true);
        //alert(error);
        throw(error);
    }
    switch (implementation)
    {
        case "RulerJsInt":
            return new RulerJsInt(length, tickCount);
        case "RulerJsBigInt":
            return new RulerJsBigInt(length, tickCount);
    }
}

function insertCombos(ul, length, combos)
{
    const liNumber = document.createElement("li");
    const liRulers = document.createElement("li");
    liNumber.innerHTML = "0    5   10   15   20   25   30   35   40   45   50".replaceAll(" ", "&nbsp;");
    liRulers.innerHTML = "|    |    |    |    |    |    |    |    |    |    |".replaceAll(" ", "'");
    ul.append(liNumber);
    ul.append(liRulers);
    let count = 0;
    for (const combo of combos)
    {
        count++;
        const li = document.createElement("li");
        li.innerHTML = combo.toString(length).replaceAll(" ", "&nbsp;");
        ul.append(li)
    }
    return count;
}
