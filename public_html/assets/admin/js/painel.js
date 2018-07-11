let PainelClass = function ()
{
    var _self = this;
    var chartVisitas;
    var chartPageViews;

    this.bildChartVisitas = function ()
    {
        chartVisitas = new Chart($('#chartVisitas').get(0), {
            type: 'radar',
            data: {
                datasets: [{
                        data: Object.values(chartVisitas_data),
                        borderColor: '#fa8564'
                    }],
                labels: Object.keys(chartVisitas_data)
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Visitas'
                }
            }
        });
    }

    this.bildChartPageViews = function ()
    {
        chartVisitas = new Chart($('#chartPageViews').get(0), {
            type: 'polarArea',
            data: {
                datasets: [{
                        data: Object.values(chartPageViews_data),
                        backgroundColor: palette('tol-dv', Object.keys(chartPageViews_data).length).map(function (hex) {
                            return '#' + hex;
                        })
                    }],
                labels: Object.keys(chartPageViews_data)
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'PageViews'
                }
            }
        });
    }

    this.detalhesVisitas = function ()
    {
        $('.detalhes_visitas').on('click', function (e) {
            e.preventDefault();
            var elm = $(this);
            $(elm.attr('href')).modal();
        })
    }

    this.bildChartFranquias = function ()
    {
        chartVisitas = new Chart($('#chartFranquias').get(0), {
            type: 'doughnut',
            data: {
                datasets: [{
                        data: Object.values(chartFranquias_data),
                        backgroundColor: palette('tol-dv', Object.keys(chartFranquias_data).length).map(function (hex) {
                            return '#' + hex;
                        })
                    }],
                labels: Object.keys(chartFranquias_data)
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    position: 'bottom'
                }
            }
        });

    }
    
    this.parseURL = function ()
    {
        var url = location.href;
        if (url[url.length -1] === "/")
            url = url.replace(/.$/, "");
        return url;
    }

    this.getBanners = function ()
    {
        var url = String(this.parseURL()).split("/");
        var de = "", ate = "";
        console.log(url);
        if (url[url.length -1] !== "painel" && url[url.length -2] !== "painel") {
            de = "/" + url[url.length -2];
            ate = "/" + url[url.length -1];            
        }
        
        $.getJSON(base_url + 'painel/getBanners' + de + ate, function (result) {
            var html = '<table class="table table-striped">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Título</th>' +
                    '<th>Posição</th>' +
                    '<th>Impressões</th>' +
                    '<th>Clicks</th>' +
                    '</tr>' +
                    '</thead>';

            $.each(result, function (key, val) {
                html += '<tr>' +
                        '<td>' + val.nome + '</td>' +
                        '<td>' + val.posicao + '</td>' +
                        '<td>' + val.views + '</td>' +
                        '<td>' + val.clicks + '</td>' +
                        '</tr>'
            })
            html += '</table>'
            $('#resultBanners').html(html);
        });
    }

    this.init = function ()
    {
        if (typeof chartVisitas != 'undefined') {
            chartVisitas.destroy();
        }

        if (typeof chartPageViews != 'undefined') {
            chartPageViews.destroy();
        }

        _self.bildChartVisitas();
        _self.bildChartPageViews();
        _self.detalhesVisitas();
        _self.bildChartFranquias();
        _self.getBanners();
    }

    _self.init();
}

var Painel = new PainelClass();
