var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var url = "https://nbaserver-q21u.onrender.com";
var form = document.querySelector('#form');
var submit = document.querySelector('#submit');
var table = document.querySelector('table');
var fantasyTeamArr = ["", "", "", "", ""];
function createPlayerRequest() {
    var position = document.querySelector('#position');
    var twoPercent = document.querySelector('#twoPercent');
    var threePercent = document.querySelector('#threePercent');
    var points = document.querySelector('#points');
    var playerRequest = {
        position: position.value,
        twoPercent: Number(twoPercent.value),
        threePercent: Number(threePercent.value),
        points: Number(points.value)
    };
    return playerRequest;
}
function getFilteredPlayers(filterdPlayer) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(url, "/api/filter"), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(filterdPlayer)
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function addToTable(listFilterdPlayersResponse) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _loop_1 = function (i) {
                        var currentPlayer = listFilterdPlayersResponse[i];
                        var tableRow = document.createElement('tr');
                        var tablePlayerName = document.createElement('td');
                        var tablePosition = document.createElement('td');
                        var tablePoints = document.createElement('td');
                        var tableTwoPercent = document.createElement('td');
                        var tableThreePercent = document.createElement('td');
                        var tableAction = document.createElement('td');
                        tablePlayerName.textContent = currentPlayer.playerName;
                        tablePosition.textContent = currentPlayer.position;
                        tablePoints.textContent = String(currentPlayer.points);
                        tableTwoPercent.textContent = String(currentPlayer.twoPercent);
                        tableThreePercent.textContent = String(currentPlayer.threePercent);
                        var AddButton = document.createElement('button');
                        AddButton.textContent = "Add ".concat(currentPlayer.playerName, " To ").concat(currentPlayer.position);
                        AddButton.addEventListener('click', function () {
                            var _a, _b, _c, _d;
                            var playerCard = document.querySelector("#".concat(currentPlayer.position));
                            (_a = playerCard.querySelector("#name")) === null || _a === void 0 ? void 0 : _a.remove();
                            (_b = playerCard.querySelector("#threePercent")) === null || _b === void 0 ? void 0 : _b.remove();
                            (_c = playerCard.querySelector("#twoPercent")) === null || _c === void 0 ? void 0 : _c.remove();
                            (_d = playerCard.querySelector("#points")) === null || _d === void 0 ? void 0 : _d.remove();
                            var name = document.createElement("p");
                            name.id = "name";
                            var threePercent = document.createElement("p");
                            threePercent.id = "threePercent";
                            var twoPercent = document.createElement("p");
                            twoPercent.id = "twoPercent";
                            var points = document.createElement("p");
                            points.id = "points";
                            name.textContent = currentPlayer.playerName;
                            threePercent.textContent = "Tree Percent: ".concat(String(currentPlayer.threePercent));
                            twoPercent.textContent = "Two Percent: ".concat(String(currentPlayer.twoPercent));
                            points.textContent = " Points: ".concat(String(currentPlayer.points));
                            playerCard.appendChild(name);
                            playerCard.appendChild(threePercent);
                            playerCard.appendChild(twoPercent);
                            playerCard.appendChild(points);
                            addPlayerToTable(currentPlayer);
                            saveToLocalStorage();
                        });
                        tableAction.appendChild(AddButton);
                        tableRow.appendChild(tablePlayerName);
                        tableRow.appendChild(tablePosition);
                        tableRow.appendChild(tablePoints);
                        tableRow.appendChild(tableTwoPercent);
                        tableRow.appendChild(tableThreePercent);
                        tableRow.appendChild(tableAction);
                        table.appendChild(tableRow);
                    };
                    i = 0;
                    _b.label = 1;
                case 1:
                    _a = i;
                    return [4 /*yield*/, listFilterdPlayersResponse.length];
                case 2:
                    if (!(_a < (_b.sent()))) return [3 /*break*/, 4];
                    _loop_1(i);
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function randerTable() {
    return __awaiter(this, void 0, void 0, function () {
        var listFilterdPlayersResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFilteredPlayers(createPlayerRequest())];
                case 1:
                    listFilterdPlayersResponse = _a.sent();
                    return [4 /*yield*/, addToTable(listFilterdPlayersResponse)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    randerTable();
});
function addPlayerToTable(player) {
    switch (player.position) {
        case 'PG':
            fantasyTeamArr[0] = "{playerName: ".concat(player.playerName, ", position: ").concat(player.position, ", points: ").concat(player.points, ", twoPercent: ").concat(player.twoPercent, ", threePercent: ").concat(player.threePercent, "}");
            break;
        case 'SG':
            fantasyTeamArr[1] = "{playerName: ".concat(player.playerName, ", position: ").concat(player.position, ", points: ").concat(player.points, ", twoPercent: ").concat(player.twoPercent, ", threePercent: ").concat(player.threePercent, "}");
            break;
        case 'SF':
            fantasyTeamArr[2] = "{playerName: ".concat(player.playerName, ", position: ").concat(player.position, ", points: ").concat(player.points, ", twoPercent: ").concat(player.twoPercent, ", threePercent: ").concat(player.threePercent, "}");
            break;
        case 'PF':
            fantasyTeamArr[3] = "{playerName: ".concat(player.playerName, ", position: ").concat(player.position, ", points: ").concat(player.points, ", twoPercent: ").concat(player.twoPercent, ", threePercent: ").concat(player.threePercent, "}");
            break;
        case 'C':
            fantasyTeamArr[4] = "{playerName: ".concat(player.playerName, ", position: ").concat(player.position, ", points: ").concat(player.points, ", twoPercent: ").concat(player.twoPercent, ", threePercent: ").concat(player.threePercent, "}");
            break;
    }
}
function saveToLocalStorage() {
    localStorage.setItem('fantasyTeamArr', JSON.stringify(fantasyTeamArr));
}
submit.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        randerTable();
        return [2 /*return*/];
    });
}); });
