var png = [];

$(document).ready(function () {
    $("#make_pdf").click(function (ev) {
        var button = $(this);
        busyIndicator("visible", "");

        setTimeout(function () {
            var reports = $("#reports").children();
            var total_reports = (reports.length - 1);
            
            var it = 0;
            reports.each(function (index) {
                var div = $(this);
                html2canvas(div.get(0), {
                    background: "#fff",
                    onrendered: function (canvas) {
                        png.push({it: index, id: div.attr("id"), content: canvas});
                        if (it == total_reports) {
                            makePDF();
                            busyIndicator("hide", button);
                        }
                        it++;
                    }
                });
            });
        }, 500);
        ev.preventDefault();
    });
});

function makePDF()
{
    var pdf = new jsPDF('p', 'pt', 'a4');
    var pdf_width = Math.round(pdf.internal.pageSize.width);
    var pdf_height = Math.round(pdf.internal.pageSize.height);
    var pdf_height_const = Math.round(pdf.internal.pageSize.height);

    var pos_y = 0;
    var pos_x = 0;
    
    png.sort(compare);
    for (var it = 0; it < png.length; it++) {
        console.log(png[it]['id']);
        
        var _width = png[it]['content'].width;
        var _height = png[it]['content'].height;

        if (_width > pdf_width) {
            _height = (pdf_width / _width * _height)
            _width = pdf_width;
        }

        if (_height > pdf_height) {
            pdf.addPage();
            pdf_height = pdf_height_const;
            pos_y = 0;
        }
        
        pdf.addImage(png[it]['content'], pos_x, pos_y, _width, _height);
        var _height_max = Math.round(_height) + 1;
        pos_y += _height_max;
        pdf_height -= _height_max;
    }
    pdf.save("report.pdf");
    png.splice(0, png.length);
    
}

function compare(a,b) {
    if (a.it < b.it)
        return -1;
    if (a.it > b.it)
        return 1;
    return 0;
}