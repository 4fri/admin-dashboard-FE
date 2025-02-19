<template>
    <div class="container">
      <div class="row">
        <!-- Line Chart -->
        <div class="col-md-6 mb-4">
          <div class="chart-container">
            <div class="filter-section mb-3">
              <select v-model="lineChartFilter" class="form-select">
                <option value="all">All Time</option>
                <option value="6m">Last 6 Months</option>
                <option value="3m">Last 3 Months</option>
                <option value="1m">Last Month</option>
              </select>
            </div>
            <h3>Line Chart</h3>
            <apexchart
              :options="filteredLineChartOptions"
              :series="filteredLineSeries"
              type="line"
              height="350"
            ></apexchart>
          </div>
        </div>
  
        <!-- Bar Chart -->
        <div class="col-md-6 mb-4">
          <div class="chart-container">
            <div class="filter-section mb-3">
              <select v-model="barChartFilter" class="form-select">
                <option value="all">All Revenue</option>
                <option value="net">Net Revenue</option>
                <option value="gross">Gross Revenue</option>
              </select>
            </div>
            <h3>Bar Chart</h3>
            <apexchart
              :options="filteredBarChartOptions"
              :series="filteredBarSeries"
              type="bar"
              height="350"
            ></apexchart>
          </div>
        </div>
  
        <!-- Pie Chart -->
        <div class="col-md-6 mb-4">
          <div class="chart-container">
            <div class="filter-section mb-3">
              <select v-model="pieChartFilter" class="form-select">
                <option value="all">All Teams</option>
                <option value="top3">Top 3 Teams</option>
                <option value="bottom3">Bottom 3 Teams</option>
              </select>
            </div>
            <h3>Pie Chart</h3>
            <apexchart
              :options="filteredPieChartOptions"
              :series="filteredPieSeries"
              type="pie"
              height="350"
            ></apexchart>
          </div>
        </div>
  
        <!-- Donut Chart -->
        <div class="col-md-6 mb-4">
          <div class="chart-container">
            <div class="filter-section mb-3">
              <select v-model="donutChartFilter" class="form-select">
                <option value="all">All Categories</option>
                <option value="top">Top Categories</option>
                <option value="bottom">Bottom Categories</option>
              </select>
            </div>
            <h3>Donut Chart</h3>
            <apexchart
              :options="filteredDonutChartOptions"
              :series="filteredDonutSeries"
              type="donut"
              height="350"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VueApexCharts from 'vue3-apexcharts';
  
  export default {
    components: {
      apexchart: VueApexCharts
    },
    data() {
      return {
        // Filter states
        lineChartFilter: 'all',
        barChartFilter: 'all',
        pieChartFilter: 'all',
        donutChartFilter: 'all',
  
        // Full dataset
        fullMonthlyData: [
          { month: 'Jan', sales: 10, netRevenue: 25, grossRevenue: 30 },
          { month: 'Feb', sales: 41, netRevenue: 45, grossRevenue: 50 },
          { month: 'Mar', sales: 35, netRevenue: 40, grossRevenue: 45 },
          { month: 'Apr', sales: 51, netRevenue: 55, grossRevenue: 60 },
          { month: 'May', sales: 49, netRevenue: 65, grossRevenue: 70 },
          { month: 'Jun', sales: 62, netRevenue: 75, grossRevenue: 80 },
          { month: 'Jul', sales: 69, netRevenue: 85, grossRevenue: 90 },
          { month: 'Aug', sales: 91, netRevenue: 95, grossRevenue: 100 },
          { month: 'Sep', sales: 148, netRevenue: 105, grossRevenue: 110 }
        ],
  
        teamData: [
          { team: 'Team A', value: 44 },
          { team: 'Team B', value: 55 },
          { team: 'Team C', value: 13 },
          { team: 'Team D', value: 43 },
          { team: 'Team E', value: 22 }
        ],
  
        categoryData: [
          { category: 'Category 1', value: 44 },
          { category: 'Category 2', value: 55 },
          { category: 'Category 3', value: 41 },
          { category: 'Category 4', value: 17 },
          { category: 'Category 5', value: 15 }
        ],
  
        // Base chart options
        baseLineChartOptions: {
          chart: { height: 350 },
          stroke: { curve: 'smooth' },
          title: { text: 'Monthly Sales Data', align: 'center' }
        },
  
        baseBarChartOptions: {
          chart: { height: 350 },
          title: { text: 'Monthly Revenue Data', align: 'center' }
        },
  
        basePieChartOptions: {
          chart: { type: 'pie' },
          title: { text: 'Team Distribution', align: 'center' }
        },
  
        baseDonutChartOptions: {
          chart: { type: 'donut' },
          title: { text: 'Category Distribution', align: 'center' }
        }
      };
    },
    computed: {
      // Filtered data for Line Chart
      filteredLineSeries() {
        let data = [...this.fullMonthlyData];
        if (this.lineChartFilter !== 'all') {
          const months = parseInt(this.lineChartFilter);
          data = data.slice(-months);
        }
        return [{
          name: "Sales",
          data: data.map(item => item.sales)
        }];
      },
      filteredLineChartOptions() {
        return {
          ...this.baseLineChartOptions,
          xaxis: {
            categories: this.fullMonthlyData
              .slice(-(this.lineChartFilter === 'all' ? 9 : parseInt(this.lineChartFilter)))
              .map(item => item.month)
          }
        };
      },
  
      // Filtered data for Bar Chart
      filteredBarSeries() {
        const type = this.barChartFilter;
        return [{
          name: type === 'net' ? 'Net Revenue' : type === 'gross' ? 'Gross Revenue' : 'Revenue',
          data: this.fullMonthlyData.map(item => 
            type === 'net' ? item.netRevenue : 
            type === 'gross' ? item.grossRevenue : 
            item.grossRevenue
          )
        }];
      },
      filteredBarChartOptions() {
        return {
          ...this.baseBarChartOptions,
          xaxis: {
            categories: this.fullMonthlyData.map(item => item.month)
          }
        };
      },
  
      // Filtered data for Pie Chart
      filteredPieSeries() {
        let data = [...this.teamData];
        if (this.pieChartFilter === 'top3') {
          data = [...data].sort((a, b) => b.value - a.value).slice(0, 3);
        } else if (this.pieChartFilter === 'bottom3') {
          data = [...data].sort((a, b) => a.value - b.value).slice(0, 3);
        }
        return data.map(item => item.value);
      },
      filteredPieChartOptions() {
        let data = [...this.teamData];
        if (this.pieChartFilter === 'top3') {
          data = [...data].sort((a, b) => b.value - a.value).slice(0, 3);
        } else if (this.pieChartFilter === 'bottom3') {
          data = [...data].sort((a, b) => a.value - b.value).slice(0, 3);
        }
        return {
          ...this.basePieChartOptions,
          labels: data.map(item => item.team)
        };
      },
  
      // Filtered data for Donut Chart
      filteredDonutSeries() {
        let data = [...this.categoryData];
        if (this.donutChartFilter === 'top') {
          data = [...data].sort((a, b) => b.value - a.value).slice(0, 3);
        } else if (this.donutChartFilter === 'bottom') {
          data = [...data].sort((a, b) => a.value - b.value).slice(0, 3);
        }
        return data.map(item => item.value);
      },
      filteredDonutChartOptions() {
        let data = [...this.categoryData];
        if (this.donutChartFilter === 'top') {
          data = [...data].sort((a, b) => b.value - a.value).slice(0, 3);
        } else if (this.donutChartFilter === 'bottom') {
          data = [...data].sort((a, b) => a.value - b.value).slice(0, 3);
        }
        return {
          ...this.baseDonutChartOptions,
          labels: data.map(item => item.category)
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .filter-section {
    display: flex;
    justify-content: flex-end;
  }
  
  .form-select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
    font-size: 14px;
  }
  
  .form-select:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  </style>