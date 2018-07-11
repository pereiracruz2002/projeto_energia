    </section>
</section>

<script src="<?php echo base_url() ?>assets/admin/js/jquery.js"></script>
<script src="<?php echo base_url() ?>assets/admin/js/mask.js"></script>
<script src="<?php echo base_url() ?>assets/admin/js/scripts.js?c=<?php echo uniqid() ?>"></script>
<script src="<?php echo base_url() ?>assets/admin/bs3/js/bootstrap.min.js"></script>
<script class="include" type="text/javascript" src="<?php echo base_url() ?>assets/admin/js/jquery.dcjqaccordion.2.7.js"></script>
<script src="<?php echo base_url() ?>assets/admin/js/jquery.scrollTo.min.js"></script>
<script src="<?php echo base_url() ?>assets/admin/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.js"></script>
<script src="<?php echo base_url() ?>assets/admin/js/jquery.nicescroll.js"></script>

<script src="<?php echo base_url() ?>assets/admin/js/select2/select2.js"></script>
<?php
if (isset($jsFiles)):
    foreach ($jsFiles as $v):
        ?>
        <?php if (strpos($v, 'http') === 0):  ?>
            <script src="<?php echo $v ?>"></script>
        <?php else: ?>
            <script src="<?php echo base_url() ?>assets/admin/js/<?php echo $v ?>?c=<?php echo uniqid() ?>"></script>
        <?php endif; ?>
        <?php
    endforeach;
endif;
?>
<?php if (file_exists(FCPATH . 'assets/admin/js/' . $this->uri->segment(2) . '.js')): ?>
    <script src="<?php echo base_url() ?>assets/admin/js/<?php echo $this->uri->segment(2) ?>.js?c=<?php echo uniqid() ?>"></script>
<?php endif; ?>
</body>
</html>

