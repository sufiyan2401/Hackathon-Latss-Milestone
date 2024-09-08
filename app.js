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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
document.addEventListener('DOMContentLoaded', function () {
    // Create and append custom cursor
    var cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', function (e) {
        if (cursor) {
            cursor.style.left = "".concat(e.clientX, "px");
            cursor.style.top = "".concat(e.clientY, "px");
        }
    });
    // Modal functionality
    var modal = document.getElementById('myModal');
    var btn = document.getElementById('openModal');
    var span = document.getElementsByClassName('close')[0];
    if (btn) {
        btn.onclick = function () {
            if (modal) {
                modal.style.display = 'block';
            }
        };
    }
    if (span) {
        span.onclick = function () {
            if (modal) {
                modal.style.display = 'none';
            }
        };
    }
    window.onclick = function (event) {
        if (modal && event.target === modal) {
            modal.style.display = 'none';
        }
    };
    // Form submission
    var form = document.getElementById('resumeForm');
    if (form) {
        form.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
            var formData, data;
            return __generator(this, function (_a) {
                e.preventDefault();
                formData = new FormData(form);
                data = {};
                formData.forEach(function (value, key) {
                    data[key] = value.toString();
                });
                console.log(data);
                if (modal) {
                    modal.style.display = 'none';
                }
                displayCV(data);
                return [2 /*return*/];
            });
        }); });
    }
    function displayCV(data) {
        var cv = document.getElementById('resumeContainer');
        var downloadPdf = document.getElementById('downloadPdf');
        if (cv) {
            var cvName = document.getElementById('cvName');
            var cvLastname = document.getElementById('cvLastname');
            var cvEmail = document.getElementById('cvEmail');
            var cvEducation = document.getElementById('cvEducation');
            var cvWorkExperience = document.getElementById('cvWorkExperience');
            var cvSkills = document.getElementById('cvSkills');
            var mainSection = document.querySelector('main');
            var introuductions = document.querySelector('introuductions');
            if (cvName) {
                cvName.innerText = data.name || '';
            }
            if (cvLastname) {
                cvLastname.innerText = data.lastname || '';
            }
            if (cvEmail) {
                cvEmail.innerText = data.email || '';
            }
            if (cvEducation) {
                cvEducation.innerText = data.education || '';
            }
            if (cvWorkExperience) {
                cvWorkExperience.innerText = data.workExperience || '';
            }
            if (cvSkills) {
                cvSkills.innerText = data.skills || '';
                var skillsArray = data.skills ? data.skills.split(',').map(function (skill) { return skill.trim(); }) : [];
                cvSkills.innerHTML = skillsArray.join('<br>');
            }
            if (mainSection) {
                mainSection.style.display = 'none';
            }
            if (cv) {
                cv.style.display = 'block';
                downloadBtn.style.display = 'block';
            }
            if (downloadPdf) {
                downloadPdf.style.display = 'block';
            }
        }
    }
});
var downloadBtn = document.getElementById('downloadPdf');
downloadBtn.onclick = function () {
    var element = document.getElementById('resumeContainer');
    // Ensure content is visible before downloading PDF
    html2pdf().from(element).save();
};
