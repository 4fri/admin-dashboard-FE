<template>
  <div class="row justify-content-center">
    <div class="col-lg-12">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
        <div class="card pt-3 px-3 shadow w-md-auto mb-3 mb-md-0">
            <!-- Nav Pills -->
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link text-dark active" id="pills-alert-tab" data-bs-toggle="pill" data-bs-target="#pills-alert" type="button" role="tab" aria-controls="pills-alert" aria-selected="true">Alert</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link text-dark" id="pills-allData-tab" data-bs-toggle="pill" data-bs-target="#pills-allData" type="button" role="tab" aria-controls="pills-allData" aria-selected="false">Data</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link text-dark" id="pills-chart-tab" data-bs-toggle="pill" data-bs-target="#pills-chart" type="button" role="tab" aria-controls="pills-chart" aria-selected="false">Chart</button>
            </li>
          </ul>

        </div>
        <!-- Filter -->
        <div class="d-flex flex-column flex-md-row align-items-center">
          <input type="text" class="form-control border-primary me-3 mb-2 mb-md-0" placeholder="Search..." v-model="searchTerm" >
          <div class="dropdown">
            <button class="btn btn-outline-primary d-flex align-items-center" type="button" id="filter" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="ri-equalizer-line"></i> Filters
            </button>
            <ul class="dropdown-menu dropdown-menu-start p-3 rounded-4" aria-labelledby="filter" style="min-width: 300px;">
              <h5 class="mb-3">Filter</h5>
              <li class="mb-2">
                <label for="dateRangePicker" class="form-label">Select Date</label>
                <input type="text"
                  @change="validateAndApplyFilters"
                  class="form-control border-secondary me-3 mb-2 mb-md-0 rounded-4" 
                  style="max-width: 260px" 
                  id="dateRangePicker"
                  placeholder="Select Date Range">
              </li>
              <li class="mb-2">
                <label for="statusFilter" class="form-label">Status</label>
                <select class="form-select rounded-4" v-model="filteredStatus" @change="applyFilters" id="statusFilter">
                  <option value="">All</option>
                  <option value="draft">Draft</option>
                  <option value="final">Final</option>
                  <option value="verified">Verified</option>
                  <option value="on_process">On Process</option>
                  <option value="done">Done</option>
                  <option value="approved">Approved</option>
                  <option value="late">Late</option>
                  <option value="reject">Rejected</option>
                </select>
              </li>
              <li class="mb-2">
                <label for="taskCategoryFilter" class="form-label">Task Category</label>
                <select class="form-select rounded-4" v-model="filteredCategory" @change="applyFilters" id="taskCategoryFilter">
                  <option value="">All</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
              </li>
              <li class="mb-2" v-if="filterDivisionEmployee">
                <label for="divisionFilter" class="form-label">Division</label>
                <select class="form-select rounded-4" v-model="filteredDivision" @change="applyFilters" id="divisionFilter">
                  <option value="">All</option>
                  <option v-for="division in divisions" :key="division.division_code" :value="division.division_code">
                    {{ division.division_name }}
                  </option>
                </select>
              </li>
              <li class="mb-2" v-if="filterDivisionEmployee">
                <label for="employeeNameFilter" class="form-label">Employee Name</label>
                <select class="form-select rounded-4" v-model="filteredEmployeeName" @change="applyFilters" id="employeeNameFilter">
                  <option value="">All</option>
                  <option v-for="user in users" :key="user.id" :value="user.name">
                    {{ user.name }}
                  </option>
                </select>
              </li>
              <li>
                <button class="btn btn-danger w-100 rounded-4 my-2" @click="resetFilters">Reset Filters</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="tab-content" id="pills-tabContent">
        <!-- List -->
        <div class="row tab-pane fade show active" id="pills-alert" role="tabpanel" aria-labelledby="pills-alert-tab">
          <div class="col-lg-12">
            <section class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <table id="basic-table" class="table table-striped mb-0" role="grid">
                    <thead>
                      <tr>
                        <th>Companies</th>
                        <th>Members</th>
                        <th>Budget</th>
                        <th>Status</th>
                        <th>Completion</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img class="rounded img-fluid avatar-40 me-3 bg-soft-primary" src="@/assets/images/shapes/01.png" alt="profile" loading="lazy" />
                            <h6>Soft UI XD Version</h6>
                          </div>
                        </td>
                        <td>
                          <div class="iq-media-group iq-media-group-1">
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">SP</div>
                            </a>
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">PP</div>
                            </a>
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">MM</div>
                            </a>
                          </div>
                        </td>
                        <td>$14000</td>
                        <td><div class="text-info">Pending</div></td>
                        <td>
                          <div class="d-flex align-items-center mb-2">
                            <h6>60%</h6>
                          </div>
                          <div class="progress bg-soft-info shadow-none w-100" style="height: 6px">
                            <div class="progress-bar bg-info" data-toggle="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img class="rounded img-fluid avatar-40 me-3 bg-soft-primary" src="@/assets/images/shapes/02.png" alt="profile" loading="lazy" />
                            <h6>Add Progress Track</h6>
                          </div>
                        </td>
                        <td>
                          <div class="iq-media-group iq-media-group-1">
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">SP</div>
                            </a>
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">PP</div>
                            </a>
                          </div>
                        </td>
                        <td>$3000</td>
                        <td><div class="text-danger">Pending</div></td>
                        <td>
                          <div class="d-flex align-items-center mb-2">
                            <h6>10%</h6>
                          </div>
                          <div class="progress bg-soft-danger shadow-none w-100" style="height: 6px">
                            <div class="progress-bar bg-danger" data-toggle="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style="width: 10%"></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img class="rounded img-fluid avatar-40 me-3 bg-soft-primary" src="@/assets/images/shapes/03.png" alt="profile" loading="lazy" />
                            <h6>Fix Platform Errors</h6>
                          </div>
                        </td>
                        <td>
                          <div class="iq-media-group iq-media-group-1">
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">SP</div>
                            </a>
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">PP</div>
                            </a>
                          </div>
                        </td>
                        <td>Not set</td>
                        <td><div class="text-success">Completed</div></td>
                        <td>
                          <div class="d-flex align-items-center mb-2">
                            <h6>100%</h6>
                          </div>
                          <div class="progress bg-soft-success shadow-none w-100" style="height: 6px">
                            <div class="progress-bar bg-success" data-toggle="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img class="rounded img-fluid avatar-40 me-3 bg-soft-primary" src="@/assets/images/shapes/04.png" alt="profile" loading="lazy" />
                            <h6>Launch Our Mobile App</h6>
                          </div>
                        </td>
                        <td>
                          <div class="iq-media-group iq-media-group-1">
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">SP</div>
                            </a>
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">PP</div>
                            </a>
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">AP</div>
                            </a>
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">DP</div>
                            </a>
                          </div>
                        </td>
                        <td>$20500</td>
                        <td><div class="text-success">Completed</div></td>
                        <td>
                          <div class="d-flex align-items-center mb-2">
                            <h6>100%</h6>
                          </div>
                          <div class="progress bg-soft-success shadow-none w-100" style="height: 6px">
                            <div class="progress-bar bg-success" data-toggle="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img class="rounded img-fluid avatar-40 me-3 bg-soft-primary" src="@/assets/images/shapes/06.png" alt="profile" loading="lazy" />
                            <h6>Add the New Pricing Page</h6>
                          </div>
                        </td>
                        <td>
                          <div class="iq-media-group iq-media-group-1">
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">SP</div>
                            </a>
                          </div>
                        </td>
                        <td>$500</td>
                        <td><div class="text-primary">On Schedule</div></td>
                        <td>
                          <div class="d-flex align-items-center mb-2">
                            <h6>25%</h6>
                          </div>
                          <div class="progress bg-soft-primary shadow-none w-100" style="height: 6px">
                            <div class="progress-bar bg-primary" data-toggle="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%"></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img class="rounded img-fluid avatar-40 me-3 bg-soft-primary" src="@/assets/images/shapes/01.png" alt="profile" loading="lazy" />
                            <h6>Redesign New Online Shop</h6>
                          </div>
                        </td>
                        <td>
                          <div class="iq-media-group iq-media-group-1">
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">SP</div>
                            </a>
                            <a href="#" class="iq-media-1">
                              <div class="icon iq-icon-box-3 rounded-pill">PP</div>
                            </a>
                          </div>
                        </td>
                        <td>$2000</td>
                        <td><div class="text-warning">Completed</div></td>
                        <td>
                          <div class="d-flex align-items-center mb-2">
                            <h6>40%</h6>
                          </div>
                          <div class="progress bg-soft-warning shadow-none w-100" style="height: 6px">
                            <div class="progress-bar bg-warning" data-toggle="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"></div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
        <!-- All Data -->
        <div class="row tab-pane fade" id="pills-allData" role="tabpanel" aria-labelledby="pills-allData-tab">
          <div class="col-lg-12">
            <section class="card">
              <div class="card-body">
                <div class="table-responsive border-bottom my-3">
                  <data-table :data="DataTableOptions.data" :columns="DataTableOptions.columns" isFooter="bootstrap-data-table" />
                </div>
              </div>
            </section>
          </div>
        </div>
        <!-- Charts -->
        <div class="row tab-pane fade" id="pills-chart" role="tabpanel" aria-labelledby="pills-chart-tab">
          <div class="col-lg-12">
            <section class="card">
              <div class="card-body">
                  <p>Section Charts</p>
              </div>
            </section>
          </div>
        </div>  
      </div>          
    </div>
  </div>
</template>
  
  <script>
  import { onMounted } from 'vue'
  import AOS from 'aos'
  import DataTable from '@/components/DataTable.vue'
  
  export default {
    name: 'TableComponent',
    components: {
      DataTable
    },
    setup() {
      const DataTableOptions = {
        columns: [{ title: 'Name' }, { title: 'Position' }, { title: 'Office' }, { title: 'Age' }, { title: 'Startdate' }, { title: 'Salary' }],
        data: [
          ['Airi Satou', 'Accountant', 'Tokyo', '33', '2008/11/28', '$162,700'],
          ['Angelica Ramos', 'Chief Executive Officer (CEO)', 'London', '47', '2009/10/09', '$1,200,000'],
          ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '66', '2009/01/12', '$86,000'],
          ['Bradley Greer', 'Software Engineer', 'London', '41', '2012/10/13', '$132,000'],
          ['Brenden Wagner', 'Software Engineer', 'San Francisco', '28', '2011/06/07', '$206,850'],
          ['Brielle Williamson', 'Integration Specialist', 'New York', '61', '2012/12/02', '$372,000'],
          ['Bruno Nash', 'Software Engineer', 'London', '38', '2011/05/03', '$163,500'],
          ['Caesar Vance', 'Pre-Sales Support', 'New York', '21', '2011/12/12', '$106,450'],
          ['Cara Stevens', 'Sales Assistant', 'New York', '46', '2011/12/06', '$145,600'],
          ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '22', '2012/03/29', '$433,060'],
          ['Bradley Greer', 'Software Engineer', 'London', '41', '2012/10/13', '$132,000'],
          ['Brenden Wagner', 'Software Engineer', 'San Francisco', '28', '2011/06/07', '$206,850'],
          ['Brielle Williamson', 'Integration Specialist', 'New York', '61', '2012/12/02', '$372,000'],
          ['Bruno Nash', 'Software Engineer', 'London', '38', '2011/05/03', '$163,500'],
          ['Caesar Vance', 'Pre-Sales Support', 'New York', '21', '2011/12/12', '$106,450'],
          ['Airi Satou', 'Accountant', 'Tokyo', '33', '2008/11/28', '$162,700'],
          ['Angelica Ramos', 'Chief Executive Officer (CEO)', 'London', '47', '2009/10/09', '$1,200,000'],
          ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '66', '2009/01/12', '$86,000'],
          ['Bradley Greer', 'Software Engineer', 'London', '41', '2012/10/13', '$132,000'],
          ['Brenden Wagner', 'Software Engineer', 'San Francisco', '28', '2011/06/07', '$206,850'],
          ['Brielle Williamson', 'Integration Specialist', 'New York', '61', '2012/12/02', '$372,000'],
          ['Bruno Nash', 'Software Engineer', 'London', '38', '2011/05/03', '$163,500']
        ]
      }
      
      onMounted(() => {
        AOS.init({
          disable: function () {
            var maxWidth = 996
            return window.innerWidth < maxWidth
          },
          once: true,
          duration: 800
        })
      })
      return { DataTableOptions }
    }
  }
  </script>  