<template>
  <div class="row justify-content-center">
    <div class="col-lg-12">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
        <div class="card pt-3 px-3 shadow w-md-auto mb-3 mb-md-0">
            <!-- Nav Pills -->
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link text-dark active" id="pills-chart-tab" data-bs-toggle="pill" data-bs-target="#pills-chart" type="button" role="tab" aria-controls="pills-chart" aria-selected="false">Chart</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link text-dark" id="pills-allData-tab" data-bs-toggle="pill" data-bs-target="#pills-allData" type="button" role="tab" aria-controls="pills-allData" aria-selected="false">Data</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content" id="pills-tabContent">
        <!-- Charts -->
        <div class="row tab-pane fade show active" id="pills-chart" role="tabpanel" aria-labelledby="pills-chart-tab">
          <div class="col-lg-12">
            <section class="card">
              <div class="card-body">
                <chart-dashboard />
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
                  <TableWidget 
                  v-if="!loading"
                  :rows="tableData" 
                  :columns="columns"
                  :buttonEdit="{ visible: false, disable: false }"
                  :buttonDelete="{ visible: false, disable: false }"
                  :pagination="pagination"
                  @page-changed="changePage"
                  @displayData="selectedData"
                />
                <div v-else class="skeleton-loader">
                  <div v-for="n in 5" :key="n" class="skeleton-row"></div>
                </div>
                </div>
              </div>
            </section>
          </div>
        </div> 
      </div>          
    </div>
  </div>
</template>
  
  <script>
  import TableWidget from '@/components/widgets/users/TableData.vue';
  import ChartDashboard from '@/views/Components/ChartDashboard.vue'
  import api from '@/plugins/axios';
  
  export default {
    name: 'TableComponent',
    components: {
      TableWidget,
      ChartDashboard
    },
    data() {
      return {
        loading: true,
        columns: [],
        filterColumns: true,
        tableData: [],
        token: '',
        typeShowData : '',
        pagination: {
          current_page: 1,
          last_page: 1,
          prev_page_url: null,
          next_page_url: null,
        },
        listFilterData: {
          selected : { type: 'asset', label: 'Asset' },
          options : [
          { type: 'asset', label: 'Asset' },
          { type: 'customer', label: 'Customer' },
          { type: 'license', label: 'License' },
          { type: 'contract', label: 'Contract' }
        ]},
      };
    },

    created() {
      this.token = localStorage.getItem('access_token');
      this.fetchData();
    },

    methods: {
      async fetchData(page = 1) {
      this.loading = true;
      if (this.typeShowData === 'asset') {
        this.columns = [
          { key: 'name', label: 'Name' },
          { key: 'asset_tag', label: 'Asset Tag' },
          { key: 'model_id', label: 'Model ID' },
          { key: 'serial', label: 'Serial' },
          { key: 'purchase_date', label: 'Purchase Date' },
          { key: 'asset_eol_date', label: 'EOL Date' },
          { key: 'eol_explicit', label: 'EOL Explicit' },
          { key: 'purchase_cost', label: 'Purchase Cost' },
          { key: 'order_number', label: 'Order Number' },
          { key: 'assigned_to', label: 'Assigned To' },
          { key: 'notes', label: 'Notes' },
          { key: 'image', label: 'Image' },
          { key: 'user_id', label: 'User ID' },
          { key: 'created_at', label: 'Created At' },
          { key: 'updated_at', label: 'Updated At' },
          { key: 'physical', label: 'Physical' },
          { key: 'deleted_at', label: 'Deleted At' },
          { key: 'status_id', label: 'Status ID' },
          { key: 'archived', label: 'Archived' },
          { key: 'warranty_months', label: 'Warranty Months' },
          { key: 'depreciate', label: 'Depreciate' },
          { key: 'supplier_id', label: 'Supplier ID' },
          { key: 'requestable', label: 'Requestable' },
          { key: 'rtd_location_id', label: 'RTD Location ID' },
          { key: 'accepted', label: 'Accepted' },
          { key: 'last_checkout', label: 'Last Checkout' },
          { key: 'last_checkin', label: 'Last Checkin' },
          { key: 'expected_checkin', label: 'Expected Checkin' },
          { key: 'company_id', label: 'Company ID' },
          { key: 'assigned_type', label: 'Assigned Type' },
          { key: 'last_audit_date', label: 'Last Audit Date' },
          { key: 'next_audit_date', label: 'Next Audit Date' },
          { key: 'location_id', label: 'Location ID' },
          { key: 'checkin_counter', label: 'Checkin Counter' },
          { key: 'checkout_counter', label: 'Checkout Counter' },
          { key: 'requests_counter', label: 'Requests Counter' },
          { key: 'byod', label: 'BYOD' },
          { key: 'Asset Tag', label: 'Asset Tag Alias' },
        ];
      }else if(this.typeShowData === 'customer'){
        this.columns = [
          { key: "no_contract", label: "No. Contract" },
          { key: "jobname", label: "Job Name" },
          { key: "po_number", label: "PO Number" },
          { key: "partner", label: "Partner" },
          { key: "no_spk", label: "No. SPK" },
          { key: "cust", label: "Customer" },
          { key: "start_date", label: "Start Date" },
          { key: "end_date", label: "End Date" },
          { key: "code_project", label: "Project Code" },
          { key: "value", label: "Value" },
          { key: "project_manager", label: "Project Manager" },
          { key: "type", label: "Type" },
          { key: "status_project", label: "Project Status" },
          { key: "user_id", label: "User ID" },
          { key: "category", label: "Category" },
          { key: "segment", label: "Segment" },
          { key: "product", label: "Product" },
          { key: "attachment", label: "Attachment" },
          { key: "created_at", label: "Created At" },
          { key: "updated_at", label: "Updated At" },
          { key: "deleted_at", label: "Deleted At" },
          { key: "no_so", label: "No. SO" }
        ];
      }else if(this.typeShowData === 'license'){
        this.columns = [
          { key: "name", label: "Name" },
          { key: "serial", label: "Serial" },
          { key: "purchase_date", label: "Purchase Date" },
          { key: "purchase_cost", label: "Purchase Cost" },
          { key: "order_number", label: "Order Number" },
          { key: "seats", label: "Seats" },
          { key: "notes", label: "Notes" },
          { key: "user_id", label: "User ID" },
          { key: "depreciation_id", label: "Depreciation ID" },
          { key: "created_at", label: "Created At" },
          { key: "updated_at", label: "Updated At" },
          { key: "deleted_at", label: "Deleted At" },
          { key: "license_name", label: "License Name" },
          { key: "license_email", label: "License Email" },
          { key: "depreciate", label: "Depreciate" },
          { key: "supplier_id", label: "Supplier ID" },
          { key: "expiration_date", label: "Expiration Date" },
          { key: "purchase_order", label: "Purchase Order" },
          { key: "termination_date", label: "Termination Date" },
          { key: "maintained", label: "Maintained" },
          { key: "reassignable", label: "Reassignable" },
          { key: "company_id", label: "Company ID" },
          { key: "manufacturer_id", label: "Manufacturer ID" },
          { key: "category_id", label: "Category ID" },
          { key: "min_amt", label: "Minimum Amount" },
          { key: "functional", label: "Functional" },
          { key: "kelompok_barang", label: "Kelompok Barang" }
        ];
      }else if(this.typeShowData === 'contract'){
        this.columns = [
          { key: "po_number", label: "PO Number" },
          { key: "partner", label: "Partner" },
          { key: "pr_number", label: "PR Number" },
          { key: "code_project", label: "Project Code" },
          { key: "project_manager", label: "Project Manager" },
          { key: "possession_asset", label: "Possession Asset" },
          { key: "user_id", label: "User ID" },
          { key: "email", label: "Email" },
          { key: "lokasi", label: "Location" },
          { key: "pic", label: "PIC" },
          { key: "nohp", label: "Phone Number" },
          { key: "urgensi", label: "Urgency" },
          { key: "start_date", label: "Start Date" },
          { key: "end_date", label: "End Date" },
          { key: "notes", label: "Notes" },
          { key: "created_at", label: "Created At" },
          { key: "updated_at", label: "Updated At" },
          { key: "deleted_at", label: "Deleted At" },
          { key: "product", label: "Product" },
          { key: "category_product", label: "Category Product" },
          { key: "attachment", label: "Attachment" },
          { key: "id_supplier", label: "Supplier ID" },
          { key: "cost_center", label: "Cost Center" },
          { key: "contract_vendor_type", label: "Contract Vendor Type" },
          { key: "no_so", label: "No. SO" }
        ];

      }

      try {
        const response = await api.get('/dashboard/get-summary-cards', {
          params: { page, type : this.typeShowData }, // Menggunakan parameter type secara dinamis
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.tableData = '';

        if (this.typeShowData === 'asset') {
              this.tableData = response.data.result.data.map((data) => ({
              id: data.id,
              name: data.name,
              asset_tag: data.asset_tag,
              model_id: data.model_id,
              serial: data.serial,
              purchase_date: data.purchase_date,
              asset_eol_date: data.asset_eol_date,
              eol_explicit: data.eol_explicit,
              purchase_cost: data.purchase_cost,
              order_number: data.order_number,
              assigned_to: data.assigned_to,
              notes: data.notes,
              image: data.image,
              user_id: data.user_id,
              created_at: data.created_at,
              updated_at: data.updated_at,
              physical: data.physical,
              deleted_at: data.deleted_at,
              status_id: data.status_id,
              archived: data.archived,
              warranty_months: data.warranty_months,
              depreciate: data.depreciate,
              supplier_id: data.supplier_id,
              requestable: data.requestable,
              rtd_location_id: data.rtd_location_id,
              accepted: data.accepted,
              last_checkout: data.last_checkout,
              last_checkin: data.last_checkin,
              expected_checkin: data.expected_checkin,
              company_id: data.company_id,
              assigned_type: data.assigned_type,
              last_audit_date: data.last_audit_date,
              next_audit_date: data.next_audit_date,
              location_id: data.location_id,
              checkin_counter: data.checkin_counter,
              checkout_counter: data.checkout_counter,
              requests_counter: data.requests_counter,
              byod: data.byod,
            }));
        }else if(this.typeShowData === 'customer'){
          this.tableData = response.data.result.data.map((data) => ({
            id: data.id,
            no_contract: data.no_contract,
            jobname: data.jobname,
            po_number: data.po_number,
            partner: data.partner,
            no_spk: data.no_spk,
            cust: data.cust,
            start_date: data.start_date,
            end_date: data.end_date,
            code_project: data.code_project,
            value: data.value,
            project_manager: data.project_manager,
            type: data.type,
            status_project: data.status_project,
            user_id: data.user_id,
            category: data.category,
            segment: data.segment,
            product: data.product,
            attachment: data.attachment,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,
            no_so: data.no_so
          }));
        }else if(this.typeShowData === 'license'){
          this.tableData = response.data.result.data.map((data) => ({
            id: data.id,
            name: data.name,
            serial: data.serial,
            purchase_date: data.purchase_date,
            purchase_cost: data.purchase_cost,
            order_number: data.order_number,
            seats: data.seats,
            notes: data.notes,
            user_id: data.user_id,
            depreciation_id: data.depreciation_id,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,
            license_name: data.license_name,
            license_email: data.license_email,
            depreciate: data.depreciate,
            supplier_id: data.supplier_id,
            expiration_date: data.expiration_date,
            purchase_order: data.purchase_order,
            termination_date: data.termination_date,
            maintained: data.maintained,
            reassignable: data.reassignable,
            company_id: data.company_id,
            manufacturer_id: data.manufacturer_id,
            category_id: data.category_id,
            min_amt: data.min_amt,
            functional: data.functional,
            kelompok_barang: data.kelompok_barang
          }));
        }else if(this.typeShowData === 'contract'){
          this.tableData = response.data.result.data.map((data) => ({
            id: data.id,
            po_number: data.po_number,
            partner: data.partner,
            pr_number: data.pr_number,
            code_project: data.code_project,
            project_manager: data.project_manager,
            possession_asset: data.possession_asset,
            user_id: data.user_id,
            email: data.email,
            lokasi: data.lokasi,
            pic: data.pic,
            nohp: data.nohp,
            urgensi: data.urgensi,
            start_date: data.start_date,
            end_date: data.end_date,
            notes: data.notes,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,
            product: data.product,
            category_product: data.category_product,
            attachment: data.attachment,
            id_supplier: data.id_supplier,
            cost_center: data.cost_center,
            contract_vendor_type: data.contract_vendor_type,
            no_so: data.no_so
          }));
        }



        this.pagination = {
          current_page: response.data.result.current_page,
          last_page: response.data.result.last_page,
          prev_page_url: response.data.result.prev_page_url,
          next_page_url: response.data.result.next_page_url,
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.fetchData(page);
      }
    },
    navigateToRoute(routeName) {
      this.$router.push({ name: routeName });
    },

    selectedData(type){
      this.typeShowData = type;
      this.fetchData();
    }
    },
  }
  </script>  

<style scoped>
.container-fluid {
  padding: 1rem;
}
.card {
  border-radius: 12px;
}
.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}
.skeleton-row {
  height: 20px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>