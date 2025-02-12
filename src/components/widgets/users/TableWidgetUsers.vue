<template>
    <div class="card-body">
        <div class="table-responsive">
          <table table id="user-list-table" class="table table-striped" role="grid" data-toggle="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th v-for="(column, index) in columns" :key="index">
                  {{ column.label }}
                </th>
                <th v-if="buttonEdit || buttonDelete || buttonNotif" class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>

              <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                <td>{{rowIndex+1}}</td>
                <td v-for="(column, colIndex) in columns" :key="colIndex">
                  {{ row[column.key] }}
                </td>
                <td>
                  <div class="d-flex justify-content-center">
                    <a class="btn btn-sm btn-icon btn-warning mx-1" 
                    data-bs-toggle="tooltip" data-bs-placement="top" 
                    data-bs-original-title="Edit" href="#"
                    title="Edit"
                    @click.prevent="openEdit(row)"
                    :disabled="buttonEdit.disable"
                    v-if="buttonEdit.visible"
                    >
                      <span class="btn-inner">
                        <icon-component type="outlined" icon-name="pencil-alt" />
                      </span>
                    </a>
                    <a class="btn btn-sm btn-icon btn-danger mx-1" 
                        data-bs-toggle="tooltip" data-bs-placement="top" 
                        data-bs-original-title="Delete" href="#"
                        @click="openDelete(row.id)"
                        title="Delete"
                        :disabled="buttonDelete.disable"
                        v-if="buttonDelete.visible"
                        >
                      <span class="btn-inner">
                        <icon-component type="outlined" icon-name="trash" />
                      </span>
                    </a>               
                  </div>
                </td>
              </tr>
              <tr v-if="rows.length === 0">
                <td :colspan="columns.length + 2" class="text-center">No data available</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION -->
        <!-- <div class="col-md-6 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)" tabindex="-1" :aria-disabled="currentPage === 1">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: currentPage === page }"
              >
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>                
        </div> -->

    </div>
</template>
<script>
export default {
  props: {
    rows: {
        type: Array,
        required: true,
      },
      columns: {
        type: Array,
        required: true,
      },
      buttonEdit: {
        type: Object,
        default: () => ({
          visible: true,
          disable: false,
        }),
      },
      buttonDelete: {
        type: Object,
        default: () => ({
          visible: true,
          disable: false,
        }),
      },
  },

  methods : {
    openEdit(row) {
      this.$emit('edit', row);
    },
    openDelete(id) {
      this.$emit('delete', id);
    },
  }

}
</script>
